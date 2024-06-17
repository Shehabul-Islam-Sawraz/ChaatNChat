import axios from "axios";
import store from '../store';
import { logout } from "../store/actions/auth";

const API = axios.create({
    baseURL: 'http://127.0.0.1:5001',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
});

API.interceptors.response.use(
    // For successfully response
    res => {
        return res
    },
    // For any errors
    err => {
        if (err.response.status !== 401) {
            throw err
        }

        if (typeof err.response.data.error.name !== 'undefined') {
            if (err.response.data.error.name === 'TokenExpiredError') {
                store.dispatch(logout())
                throw err
            }
        }
    }
)

export default API;