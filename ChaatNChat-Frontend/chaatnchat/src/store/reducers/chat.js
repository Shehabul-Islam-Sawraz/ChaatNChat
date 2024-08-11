import { FETCH_CHATS, FRIEND_OFFLINE, FRIEND_ONLINE, FRIENDS_ONLINE, SET_CURRENT_CHAT, SET_SOCKET } from '../types/index'

const initialState = {
    chats: [],
    currentChat: {},
    socket: {}
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
            const chatsCopy = state.chats.map(chat => {
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
                chats: chatsCopy
            }
        }
        case FRIEND_ONLINE: {
            let currentChatCopy = { ...state.currentChat }

            const chatsCopy = state.chats.map(chat => {
                const Users = chat.Users.map(user => {
                    if (user.id === parseInt(payload.id)) {
                        return {
                            ...user,
                            status: 'online'
                        }
                    }
                    return user
                })

                if (chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        Users
                    }
                }

                return {
                    ...chat,
                    Users
                }
            })

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy
            }
        }
        case FRIEND_OFFLINE: {
            let currentChatCopy = { ...state.currentChat }

            const chatsCopy = state.chats.map(chat => {
                const Users = chat.Users.map(user => {
                    if (user.id === parseInt(payload.id)) {
                        return {
                            ...user,
                            status: 'offline'
                        }
                    }
                    return user
                })

                if (chat.id === currentChatCopy.id) {
                    currentChatCopy = {
                        ...currentChatCopy,
                        Users
                    }
                }

                return {
                    ...chat,
                    Users
                }
            })

            return {
                ...state,
                chats: chatsCopy,
                currentChat: currentChatCopy
            }
        }
        case SET_SOCKET: {
            return {
                ...state,
                socket: payload
            }
        }
        default: {
            return state
        }
    }
}

export default chatReducer