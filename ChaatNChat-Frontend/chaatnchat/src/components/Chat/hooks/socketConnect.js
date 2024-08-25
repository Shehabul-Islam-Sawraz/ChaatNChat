import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { createChat, fetchChats, offlineFriend, onlineFriend, onlineFriends, receivedMessage, senderTyping, setSocket, addUserToGroup } from '../../../store/actions/chat';

function useSocket(user, dispatch) {

    useEffect(() => {
        // console.log(res)
        const socket = io("http://127.0.0.1:4000")

        dispatch(setSocket(socket))

        dispatch(fetchChats())
            .then(res => {
                socket.emit('join', user)

                socket.on('typing', (sender) => {
                    dispatch(senderTyping(sender))
                })

                socket.on('friends', (friends) => {
                    console.log("Friends: ", friends)
                    dispatch(onlineFriends(friends))
                })

                socket.on('online', (user) => {
                    console.log("Online: ", user)
                    dispatch(onlineFriend(user))
                })

                socket.on('offline', (user) => {
                    console.log("Offline: ", user)
                    dispatch(offlineFriend(user))
                })

                socket.on('received', (message) => {
                    dispatch(receivedMessage(message, user.id))
                })

                socket.on('new-chat', (chat) => {
                    dispatch(createChat(chat))
                })

                socket.on('added-user-to-group', (group) => {
                    dispatch(addUserToGroup(group))
                })
            })
            .catch(err => {
                console.log(err)
            })

        return () => {
            socket.disconnect()
        }
    }, [user, dispatch])
}

export default useSocket;