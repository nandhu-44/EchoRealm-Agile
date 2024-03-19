import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
const UserContext = createContext();
const baseUrl = 'http://localhost:8080';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(window.localStorage.getItem("echorealm-user-data"));
        if (userData) {
            setUser(userData.user);
            setIsAuth(true);
        }
    }, []);

    const login = async (email, password) => {
        const response = await axios.post(`${baseUrl}/api/users/login`, { email, password }, { withCredentials: true })
        if (response.data.error) {
            return response.data;
        }
        window.localStorage.setItem("echorealm-user-data", JSON.stringify(response.data));
        setUser(response.data);
        setIsAuth(true);
    };

    const register = async (email, password) => {
        const response = await axios.post(`${baseUrl}/api/users/register`, { email, password }, { withCredentials: true })
        if (response.data.error) {
            return response.data;
        }
        window.localStorage.setItem("echorealm-user-data", JSON.stringify(response.data));
        setUser(response.data);
        setIsAuth(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        window.localStorage.removeItem("echorealm-user-data");
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, register, logout, isAuth, setIsAuth }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, AuthProvider };