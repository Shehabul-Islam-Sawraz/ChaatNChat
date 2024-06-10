import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ Component }) => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    return (
        isLoggedIn
            ? <Component />
            : <Navigate to='/login' />
    );
}

export default ProtectedRoute;