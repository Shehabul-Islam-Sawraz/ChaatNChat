import API from './api'

const AuthService = {
    login: (data) => {
        return API.post('/login', data)
            .then(({ data }) => {
                setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log('Login service error: ', err);
                throw err
            })
    },

    register: (data) => {
        return API.post('/register', data)
            .then(({ data }) => {
                setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log('Register service error: ', err);
                throw err
            })
    },

    logout: () => {
        API.defaults.headers['Authorization'] = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    },

    updateProfile: (data) => {

        const headers = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        return API.post('/users/update', data, headers)
            .then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data))
                return data
            })
            .catch(err => {
                console.log('Update Profile service error: ', err);
                throw err
            })
    },
}

const setHeadersAndStorage = ({ user, token }) => {
    API.defaults.headers['Authorization'] = `Bearer ${token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export default AuthService