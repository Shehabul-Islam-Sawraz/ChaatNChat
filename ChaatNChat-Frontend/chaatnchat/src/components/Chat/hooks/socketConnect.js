import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function useSocket(user, dispatch) {
    useEffect(() => {
        const socket = socketIOClient.connect('http://127.0.0.1:3000')
        socket.emit('join', user)

        socket.on('typing', (message) => {
            console.log("Event: ", message)
        })
    }, [dispatch])
}

export default useSocket;