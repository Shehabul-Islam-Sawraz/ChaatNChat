import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { onlineFriends } from '../../../store/actions/chat';

function useSocket(user, dispatch) {
    useEffect(() => {
        const socket = io("http://127.0.0.1:4000")
        socket.emit('join', user)

        socket.on('typing', (user) => {
            console.log("Event: ", user)
        })

        socket.on('friends', (friends) => {
            console.log("Friends: ", friends)
            dispatch(onlineFriends(friends))
        })

        socket.on('online', (user) => {
            console.log("Online: ", user)
        })

        socket.on('offline', (user) => {
            console.log("Offline: ", user)
        })

        return () => {
            socket.disconnect()
        }
    }, [user, dispatch])
}

export default useSocket;