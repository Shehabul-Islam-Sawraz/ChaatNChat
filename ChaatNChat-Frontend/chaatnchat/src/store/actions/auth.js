export const Login = 'LOGIN'
import AuthService from "../../services/authService"

export const login = (data) => dispatch => {
    return AuthService.login(data)
        .then(res => {
            console.log(res)
            dispatch({ type: Login, payload: res })
        })
        .catch(err => {

        })
}