import React, { useEffect } from 'react'
import { useSelector, useDispatch, useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import './Chat.scss'
import { fetchChats } from '../../store/actions/chat';

const Chat = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    useEffect(() => {
        dispatch(fetchChats())
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [dispatch])

    return (
        <div id='chat-container'>
            <Navbar />
            <div id='chat-wrap'>
                Data
            </div>
        </div>

    );
}

export default Chat