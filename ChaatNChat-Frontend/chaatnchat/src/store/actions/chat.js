import { FETCH_CHATS, SET_CURRENT_CHAT, FRIENDS_ONLINE, FRIEND_ONLINE, FRIEND_OFFLINE, SET_SOCKET, RECEIVED_MESSAGE, SENDER_TYPING, PAGINATE_MESSAGES } from '../types/index'
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

export const onlineFriends = (friends) => dispatch => {
    dispatch({ type: FRIENDS_ONLINE, payload: friends })
}

export const onlineFriend = (friend) => dispatch => {
    dispatch({ type: FRIEND_ONLINE, payload: friend })
}

export const offlineFriend = (friend) => dispatch => {
    dispatch({ type: FRIEND_OFFLINE, payload: friend })
}

export const setSocket = (socket) => dispatch => {
    dispatch({ type: SET_SOCKET, payload: socket })
}

export const receivedMessage = (message, userId) => dispatch => {
    dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } })
}

export const senderTyping = (sender) => dispatch => {
    dispatch({ type: SENDER_TYPING, payload: sender })
}

export const paginateMessages = (chatId, page) => dispatch => {
    return ChatService.paginationMessages(chatId, page)
        .then(({ messages, pagination }) => {
            if (typeof messages !== 'undefined' && messages.length > 0) {
                messages.reverse()
                const payload = { messages, chatId, pagination }
                dispatch({ type: PAGINATE_MESSAGES, payload })
                return true
            }
            return false
        })
        .catch(err => {
            throw err
        })
}