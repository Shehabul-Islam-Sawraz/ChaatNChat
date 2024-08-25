// const socketIo = require('socket.io')
const { messages } = require('../controllers/chatController')
const { sequelize } = require('../models')
const { Server } = require('socket.io')
const Message = require('../models').Message

const users = new Map()
const userSockets = new Map()

const SocketServer = (server) => {
    // const io = socketIo(server)
    const io = new Server(server, {
        cors: "http://127.0.0.1:3000"
    });

    io.on('connection', (socket) => {
        socket.on('join', async (user) => {

            let sockets = []

            if (users.has(user.id)) { // User already exists
                const existingUser = users.get(user.id)
                existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
                users.set(user.id, existingUser)
                sockets = [...existingUser.sockets, ...[socket.id]]
                userSockets.set(socket.id, user.id)
            }
            else {
                users.set(user.id, { id: user.id, sockets: [socket.id] })
                sockets.push(socket.id)
                userSockets.set(socket.id, user.id)
            }

            const onlineFriends = []
            const chatterFriends = await getChatters(user.id)

            // Notify friends that user is now online
            for (let i = 0; i < chatterFriends.length; i++) {
                if (users.has(chatterFriends[i])) {
                    const chatter = users.get(chatterFriends[i])
                    chatter.sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('online', user)
                        } catch (e) {

                        }
                    });
                    onlineFriends.push(chatter.id)
                }
            }

            // Send to user sockets which of his friends are online
            sockets.forEach(socket => {
                try {
                    io.to(socket).emit('friends', onlineFriends)
                } catch (e) {

                }
            })

            console.log("New user joined: ", user.firstName)

            io.to(socket.id).emit('typing', 'User typing...')
        })

        socket.on('message', async (message) => {
            let sockets = []

            if (users.has(message.fromUser.id)) {
                sockets = users.get(message.fromUser.id).sockets
            }

            message.toUserId.forEach(id => {
                if (users.has(id)) {
                    sockets = [...sockets, ...users.get(id).sockets]
                }
            })

            try {
                const msg = {
                    type: message.type,
                    fromUserId: message.fromUser.id,
                    chatId: message.chatId,
                    message: message.message
                }

                const savedMessage = await Message.create(msg)

                message.User = message.fromUser
                message.fromUserId = message.fromUser.id
                message.id = savedMessage.id
                message.message = savedMessage.message
                delete message.fromUser

                sockets.forEach(socket => {
                    io.to(socket).emit('received', message)
                })
            } catch (e) { }
        })

        socket.on('typing', (message) => {
            message.toUserId.forEach(id => {
                if (users.has(id)) {
                    users.get(id).sockets.forEach(socket => {
                        io.to(socket).emit('typing', message)
                    })
                }
            })
        })

        socket.on('add-friend', (chats) => {
            try {
                let online = 'offline'
                if (users.has(chats[1].Users[0].id)) {
                    online = 'online'
                    chats[0].Users[0].status = online
                    users.get(chats[1].Users[0].id).sockets.forEach(socket => {
                        io.to(socket).emit('new-chat', chats[0])
                    })
                }

                if (users.has(chats[0].Users[0].id)) {
                    chats[1].Users[0].status = online
                    users.get(chats[0].Users[0].id).sockets.forEach(socket => {
                        io.to(socket).emit('new-chat', chats[1])
                    })
                }
            } catch (e) {

            }
        })

        socket.on('add-user-to-group', ({ chat, newChatter }) => {
            if (users.has(newChatter.id)) {
                newChatter.status = 'online'
            }

            // Old users
            chat.Users.forEach((user, index) => {
                if (users.has(user.id)) {
                    chat.Users[index].status = 'online'
                    users.get(user.id).sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('added-user-to-group', { chat, chatters: [newChatter] })
                        } catch (e) { }
                    })
                }
            })

            // Send to new chatter
            if (users.has(newChatter.id)) {
                users.get(newChatter.id).sockets.forEach(socket => {
                    try {
                        io.to(socket).emit('added-user-to-group', { chat, chatters: chat.Users })
                    } catch (e) { }
                })
            }
        })

        socket.on('leave-current-chat', (data) => {
            const { chatId, userId, currentUserId, notifyUsers } = data

            notifyUsers.forEach(id => {
                if (users.has(id)) {
                    users.get(id).sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('remove-user-from-chat', { chatId, userId, currentUserId })
                        } catch (e) { }
                    })
                }
            })
        })

        socket.on('delete-chat', (data) => {
            const { chatId, notifyUsers } = data

            notifyUsers.forEach(id => {
                if (users.has(id)) {
                    users.get(id).sockets.forEach(socket => {
                        try {
                            io.to(socket).emit('delete-chat', parseInt(chatId))
                        } catch (e) { }
                    })
                }
            })
        })

        socket.on('disconnect', async () => {
            if (userSockets.has(socket.id)) {
                const user = users.get(userSockets.get(socket.id))

                if (user.sockets.length > 1) {
                    user.sockets = user.sockets.filter(sockt => {
                        if (sockt != socket.id) {
                            return true
                        }

                        userSockets.delete(sockt)
                        return false
                    })

                    users.set(user.id, user)
                } else {
                    const chatterFriends = await getChatters(user.id)

                    for (let i = 0; i < chatterFriends.length; i++) {
                        if (users.has(chatterFriends[i])) {
                            users.get(chatterFriends[i]).sockets.forEach(socket => {
                                try {
                                    io.to(socket).emit('offline', user)
                                } catch (e) {

                                }
                            });
                        }
                    }

                    userSockets.delete(socket.id)
                    users.delete(user.id)
                }
            }
        })
    })

    io.listen(4000); // Socket listening in port 4000
}

const getChatters = async (userId) => {
    // The most inner join represents that it will join chats
    // with those user chats that this user is inside--
    // The ourter inner join will give us the id of chats
    // where this user is chatting with someone--
    // Finally we return all chat users except this user but it
    // will still have that chat that the user is inside--
    try {
        const [results, metadata] = await sequelize.query(`
            select "cu"."userId" from "ChatUsers" as cu
            inner join (
                select "c"."id" from "Chats" as c
                where exists (
                    select "u"."id" from "Users" as u
                    inner join "ChatUsers" on u.id = "ChatUsers"."userId"
                    where u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
                )
            ) as cjoin on cjoin.id = "cu"."chatId"
            where "cu"."userId" != ${parseInt(userId)}    
        `)

        return results.length > 0 ? results.map(el => el.userId) : []
    } catch (e) {
        console.log(e)
        return []
    }
}

module.exports = SocketServer