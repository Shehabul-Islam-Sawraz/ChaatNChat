import React, { useState, Fragment } from 'react'
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../../../store/actions/auth'
import Modal from '../../../Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../store/actions/auth'

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        const form = { firstName, lastName, email, gender, avatar }
        if (password.length > 0) form.password = password
        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }

        dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
    }

    return (
        <div id='navbar' className='card-shadow'>
            <h2>ChaatNChat</h2>
            <div id='profile-menu' onClick={() => setShowProfileOptions(!showProfileOptions)}>
                <img width='40' height='40' src={user.avatar} alt='Avatar' />
                <p>{user.firstName}  {user.lastName}</p>
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
                            <h3 className='m-0'>Update</h3>
                        </Fragment>

                        <Fragment key='body'>
                            <form>
                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setFirstName(e.target.value)}
                                        value={firstName}
                                        required='required'
                                        type='text'
                                        placeholder='First Name' />
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName}
                                        required='required'
                                        type='text'
                                        placeholder='Last Name' />
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        required='required'
                                        type='text'
                                        placeholder='Email' />
                                </div>

                                <div className='input-field mb-1'>
                                    <select
                                        onChange={e => setGender(e.target.value)}
                                        value={gender}
                                        required='required'
                                    >
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </select>
                                </div>

                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        required='required'
                                        type='password'
                                        placeholder='Password' />
                                </div>

                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setAvatar(e.target.files[0])}
                                        type='file' />
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key='footer'>
                            <button className='btn-success' onClick={submitForm}>UPDATE</button>
                        </Fragment>
                    </Modal>
                }
            </div>
        </div>
    )
}

export default Navbar