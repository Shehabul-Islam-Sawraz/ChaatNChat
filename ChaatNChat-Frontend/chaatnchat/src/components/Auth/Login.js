import React, { useState } from 'react'
import loginImage from '../../assets/images/login.svg'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/authService'
import './Auth.scss'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('a@gmail.com')
    const [password, setPassword] = useState('admin')

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(login({ email, password }, navigate))

        // AuthService.login({ email, password }).then(res => console.log(res))
        // axios.post('http://127.0.0.1:5001/login', { email, password })
        //     .then(res => {
        //         console.log("res: ", res);
        //     })
        //     .catch(err => {
        //         console.log("Error: ", err);
        //     })

        // console.log(email, password);
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>Welcome Back</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='required'
                                    type='text'
                                    placeholder='Email' />
                            </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Password' />
                            </div>

                            <button>LOGIN</button>
                        </form>

                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login