import React, { useState } from 'react'
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../../../store/actions/auth'

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)

    return (
        <div id='navbar' className='card-shadow'>
            <h2>ChaatNChat</h2>
            <div id='profile-menu' onClick={() => setShowProfileOptions(!showProfileOptions)}>
                <img width='40' height='40' src={user.avatar} alt='Avatar' />
                <p>{user.firstName} {user.lastName}</p>
                <FontAwesomeIcon icon='caret-down' className='fa-icon' />

                {
                    showProfileOptions &&
                    <div id='profile-options'>
                        <p>Update Profile</p>
                        <p onClick={() => dispatch(logout())}>Log Out</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar