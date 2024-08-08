const socketIo = require('socket.io')

const users = Map()

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
            }
            else {
                users.set(user.id, { id: user.id, sockets: [socket.id] })
                sockets.push(socket.id)
            }

            const onlineFriends = []
            const chatterFriends = []

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
    })
}

module.exports = SocketServer