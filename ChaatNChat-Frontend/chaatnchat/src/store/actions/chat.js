import { FETCH_CHATS, SET_CURRENT_CHAT } from '../types/index'
import ChatService from "../../services/chatService"

export const fetchChats = () => dispatch => {
    return ChatService.fetchChats()
        .then(res => {
            res.forEach(chat => {
                chat.Users.forEach(user => {
                    user.status = 'offline'
                })

                chat.Messages.reverse()
            });

            dispatch({ type: FETCH_CHATS, payload: res })
            return res
        })
        .catch(err => {
            throw err
        })
}

export const setCurrentChat = (chat) => dispatch => {
    dispatch({ type: SET_CURRENT_CHAT, payload: chat })
}