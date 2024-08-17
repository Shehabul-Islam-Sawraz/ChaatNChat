import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MessageInput.scss';
import ChatService from "../../../../services/chatService";

const MessageInput = ({ chat }) => {

    const user = useSelector(state => state.authReducer.user)
    const socket = useSelector(state => state.chatReducer.socket)

    const fileUpload = useRef()

    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')

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

    return (
        <div id="input-container">
            <div id='image-upload-container'>
                <div>

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
                    placeholder="Message..."
                    onChange={e => handleMessage(e)}
                    onKeyDown={e => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon
                    icon={['far', 'smile']}
                    className="fa-icon"
                />
            </div>

            <input id="chat-image" ref={fileUpload} type="file" onChange={e => setImage(e.target.files[0])} />

        </div>
    )
}

export default MessageInput;