import AuthService from "../../services/authService"

export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

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

export const logout = () => dispatch => {
    AuthService.logout()
    dispatch({ type: LOGOUT })
}

export const updateProfile = (data) => dispatch => {
    return AuthService.updateProfile(data)
        .then(res => {
            dispatch({ type: UPDATE_PROFILE, payload: res })
        })
        .catch(err => {

        })
}
