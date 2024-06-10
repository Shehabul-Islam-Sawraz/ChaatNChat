import React from 'react'
import './Navbar.scss'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const user = useSelector(state => state.authReducer.user)

    return (
        <div id='navbar' className='card-shadow'>
            <h2>ChaatNChat</h2>
            <div id='profile-menu'>
                <img width='40' height='40' src={user.avatar} alt='Avatar' />
                <p>{user.firstName} {user.lastName}</p>
            </div>
        </div>
    )
}

export default Navbar