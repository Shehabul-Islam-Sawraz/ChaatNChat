import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MessageInput.scss';
import ChatService from "../../../../services/chatService";
// import { Picker } from 'emoji-mart';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { incrementScroll } from "../../../../store/actions/chat";

// import 'emoji-mart/css/emoji-mart.css'

const MessageInput = ({ chat }) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)
    const socket = useSelector(state => state.chatReducer.socket)
    const newMessage = useSelector(state => state.chatReducer.newMessage)

    const fileUpload = useRef()
    const msgInput = useRef()

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const [showNewMsgNotification, setShowNewMsgNotification] = useState(false)

    const handleMessage = (e) => {
        const msg = e.target.value
        setMessage(msg)

        // Notify friends that user is typing something
        const receiver = {
            chatId: chat.id,
            fromUser: user,
            toUserId: chat.Users.map(user => user.id)
        }

        if (msg.length === 1) {
            receiver.typing = true
            socket.emit('typing', receiver)
        }

        if (msg.length === 0) {
            receiver.typing = false
            socket.emit('typing', receiver)
        }
    }

    const sendMessage = (imageUpload) => {
        if (message.length < 1 && !imageUpload) {
            return
        }

        const msg = {
            type: imageUpload ? 'image' : 'text',
            fromUser: user,
            toUserId: chat.Users.map(user => user.id),
            chatId: chat.id,
            message: imageUpload ? imageUpload : message
        }

        setMessage('')
        setImage('')
        setShowEmojiPicker(false)

        // Sending message using socket
        socket.emit('message', msg)
    }

    const handleKeyDown = (e, imageUpload) => {
        if (e.key === 'Enter') {
            sendMessage(imageUpload)
        }
    }

    const handleImageUpload = () => {
        const formData = new FormData()
        formData.append('id', chat.id)
        formData.append('image', image)

        ChatService.uploadImage(formData)
            .then(image => {
                sendMessage(image)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const selectEmoji = (emoji) => {
        const startPos = msgInput.current.selectionStart
        const endPos = msgInput.current.selectionEnd
        const emojiLen = emoji.native.length
        const value = msgInput.current.value
        setMessage(value.substring(0, startPos) + emoji.native + value.substring(endPos, value.length))
        msgInput.current.focus()
        msgInput.current.selectionEnd = endPos + emojiLen
    }

    useEffect(() => {
        if (!newMessage.seen && newMessage.chatId === chat.id) {
            const msgBox = document.getElementById('msg-box')
            if (msgBox.scrollTop > msgBox.scrollHeight * 0.30) {
                dispatch(incrementScroll())
            }
            else {
                setShowNewMsgNotification(true)
            }
        }
        else {
            setShowNewMsgNotification(false)
        }
    }, [newMessage, dispatch])

    const showNewMessage = () => {
        dispatch(incrementScroll())
        setShowNewMsgNotification(false)
    }

    return (
        <div id="input-container">
            <div id='image-upload-container'>
                <div>
                    {
                        showNewMsgNotification
                            ? <div id="message-notification" onClick={showNewMessage}>
                                <FontAwesomeIcon icon='bell' className="fa-icon" />
                                <p className="m-0">New message...</p>
                            </div>
                            : null
                    }
                </div>

                <div id="image-upload">
                    {
                        image.name
                            ? <div id="image-details">
                                <p className="m-0">{image.name}</p>
                                <FontAwesomeIcon
                                    onClick={handleImageUpload}
                                    icon='upload'
                                    className="fa-icon"
                                />
                                <FontAwesomeIcon
                                    onClick={() => setImage('')}
                                    icon='times'
                                    className="fa-icon"
                                />
                            </div>
                            : null
                    }
                    <FontAwesomeIcon
                        onClick={() => fileUpload.current.click()}
                        icon={['far', 'image']}
                        className="fa-icon"
                    />
                </div>
            </div>
            <div id="message-input">
                <input
                    type='text'
                    value={message}
                    ref={msgInput}
                    placeholder="Message..."
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    icon={['far', 'smile']}
                    className="fa-icon"
                />
            </div>

            <input id="chat-image" ref={fileUpload} type="file" onChange={e => setImage(e.target.files[0])} />

            {
                showEmojiPicker
                    ? <div style={{
                        position: "absolute",
                        // marginTop: "465px",
                        // marginLeft: -40,
                        // maxWidth: "320px",
                        bottom: "20px",
                        right: "30px",
                        borderRadius: "20px",
                    }}>
                        <Picker
                            onEmojiSelect={selectEmoji}
                            data={data}
                        />
                    </div>
                    : null
            }

        </div>
    )
}

export default MessageInput;