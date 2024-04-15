import React from 'react'
import { Navigate } from 'react-router-dom';


const AuthRedirect = () => {
  const userData = localStorage.getItem("user");
    return userData ? <Navigate to="/" /> : null;
}

export default AuthRedirect;