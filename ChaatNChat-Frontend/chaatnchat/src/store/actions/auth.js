import AuthService from "../../services/authService"

export const LOGIN = 'LOGIN'

export const login = (data) => dispatch => {
    return AuthService.login(data)
        .then(res => {
            console.log(res)
            dispatch({ type: LOGIN, payload: res })
        })
        .catch(err => {

        })
}