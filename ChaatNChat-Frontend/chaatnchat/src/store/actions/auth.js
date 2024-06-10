import AuthService from "../../services/authService"

export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'

export const login = (data, navigate) => dispatch => {
    return AuthService.login(data)
        .then(res => {
            console.log(res)
            dispatch({ type: LOGIN, payload: res })
            navigate('/')
        })
        .catch(err => {

        })
}

export const register = (data, navigate) => dispatch => {
    return AuthService.register(data)
        .then(res => {
            console.log(res)
            dispatch({ type: REGISTER, payload: res })
            navigate('/')
        })
        .catch(err => {

        })
}