import { FETCH_CHATS, FRIENDS_ONLINE, SET_CURRENT_CHAT } from '../types/index'

const initialState = {
    chats: [],
    currentChat: {}
}

const chatReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_CHATS:
            return {
                ...state,
                chats: payload
            }
        case SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload
            }
        case FRIENDS_ONLINE: {
            const chatCopy = state.chats.map(chat => {
                // console.log("Chat: ", chat)
                // console.log("Payload: ", payload)
                return {
                    ...chat,
                    Users: chat.Users.map(user => {
                        if (payload.includes(user.id)) {
                            console.log("Ase eikhane")
                            return {
                                ...user,
                                status: 'online'
                            }
                        }
                        return user
                    })
                }
            })
            // console.log("ChatCopy: ", chatCopy)
            return {
                ...state,
                chats: chatCopy
            }
        }
        default: {
            return state
        }
    }
}

export default chatReducer