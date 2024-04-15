import React from 'react'
import { Navigate } from 'react-router-dom';

const NotAuthRedirect = () => {
    const userData = localStorage.getItem("user");
    return !userData ? <Navigate to="/signin" /> : null;
}

export default NotAuthRedirect;