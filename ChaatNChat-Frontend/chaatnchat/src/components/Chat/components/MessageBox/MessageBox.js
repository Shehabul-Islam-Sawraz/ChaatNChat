import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Message from '../Message/Message';
import { paginateMessages } from "../../../../store/actions/chat";
import './MessageBox.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MessageBox = ({ chat }) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.authReducer.user)
    const [loading, setLoading] = useState(false)

    const msgBox = useRef()
    const scrollBottom = useSelector(state => state.chatReducer.scrollBottom)
    const senderTyping = useSelector(state => state.chatReducer.senderTyping)

    const scrollManual = (value) => {
        msgBox.current.scrollTop = value
    }

    const handleInfiniteScroll = (e) => {
        if (e.target.scrollTop === 0) {
            setLoading(true)
            const pagination = chat.Pagination
            const page = typeof pagination === 'undefined' ? 1 : pagination.page

            dispatch(paginateMessages(chat.id, parseInt(page) + 1))
                .then(res => {
                    if (res) {

                    }
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            scrollManual(msgBox.current.scrollHeight)
        }, 100)
    }, [scrollBottom])

    return (
        <div onScroll={handleInfiniteScroll} id="msg-box" ref={msgBox}>
            {
                loading
                    ? <p className="loader m-0"><FontAwesomeIcon icon='spinner' className="fa-spin" /></p>
                    : null
            }
            {
                chat.Messages.map((message, index) => {
                    return <Message
                        user={user}
                        chat={chat}
                        message={message}
                        index={index}
                        key={message.id}
                    />
                })
            }
            {
                senderTyping.typing && senderTyping.chatId === chat.id
                    ? <div className="message">
                        <div className="other-person">
                            <p className="m-0">{senderTyping.fromUser.lastName} typing...</p>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
}

export default MessageBox;