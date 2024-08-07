const socketIo = require('socket.io')
const { sequelize } = require('../models')

const users = new Map()
const userSockets = new Map()

const SocketServer = (server) => {
    const io = socketIo(server)

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