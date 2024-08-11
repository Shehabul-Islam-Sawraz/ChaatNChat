import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { fetchChats, offlineFriend, onlineFriend, onlineFriends, setSocket } from '../../../store/actions/chat';

function useSocket(user, dispatch) {
    useEffect(() => {

        dispatch(fetchChats())
            .then(res => {
                // console.log(res)
                const socket = io("http://127.0.0.1:4000")

                dispatch(setSocket(socket))

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
                    dispatch(onlineFriend(user))
                })

                socket.on('offline', (user) => {
                    console.log("Offline: ", user)
                    dispatch(offlineFriend(user))
                })

                console.log(res)

                return () => {
                    socket.disconnect()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [user, dispatch])
}

export default useSocket;