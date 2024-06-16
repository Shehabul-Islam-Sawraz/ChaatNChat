import React, { useState, Fragment } from 'react'
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../../../store/actions/auth'
import Modal from '../../../Modal/Modal'

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

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
                        <p onClick={() => setShowProfileModal(true)}>Update Profile</p>
                        <p onClick={() => dispatch(logout())}>Log Out</p>
                    </div>
                }

                {
                    showProfileModal &&
                    <Modal click={() => setShowProfileModal(false)}>
                        <Fragment key='header'>
                            Model Header
                        </Fragment>

                        <Fragment key='body'>
                            Model Body
                        </Fragment>

                        <Fragment key='footer'>
                            Model Footer
                        </Fragment>
                    </Modal>
                }
            </div>
        </div>
    )
}

export default Navbar