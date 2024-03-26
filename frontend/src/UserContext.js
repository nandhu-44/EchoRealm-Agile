import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import supabaseClient from './database/supabase';
const UserContext = createContext();
const baseUrl = 'http://localhost:8080';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    const getUser = async () => {
        return await supabaseClient.auth.getUser();
    };
    useEffect(() => {
        (async () => {
            const userObject = await getUser();
            const user = userObject?.data?.user;
            if (user) {
                setUser(user);
                setIsAuth(true);
            }
        })();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post(`${baseUrl}/api/users/login`, { email, password }, { withCredentials: true })
        if (response.data.error) {
            return [false, response.data.error]
        }
        window.localStorage.setItem("sb-nyotjlqxnlrzwbbklyue-auth-token", JSON.stringify(response.data));
        setUser(response.data?.user);
        setIsAuth(true);
        return [true, response.data];
    };

    const register = async (email, password) => {
        const response = await axios.post(`${baseUrl}/api/users/register`, { email, password }, { withCredentials: true })
        if (response.data.error) {
            return [false, response.data.error]
        }
        window.localStorage.setItem("sb-nyotjlqxnlrzwbbklyue-auth-token", JSON.stringify(response.data));
        setUser(response.data?.user);
        setIsAuth(true);
        return [true, response.data]
    };

    const forgotPassword = async (email) => {
        const response = await axios.post(`${baseUrl}/api/users/forgot-password`, { email }, { withCredentials: true });
        if (response.data.error) {
            return [false, response.data.error]
        } else {
            return [true, response]
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuth(false);
        window.localStorage.removeItem("sb-nyotjlqxnlrzwbbklyue-auth-token");
    };

    const handleGoogleSignIn = async (response) => {
        try {
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    }
                }
            })
            if (error) {
                console.log("Error with google login : ", error);
                return;
            }
            const user = data.user;

            if (user) {
                setUser(user);
                setIsAuth(true);
            }

        } catch (error) {
            console.log("Error with google login : ", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, register, logout, forgotPassword, isAuth, setIsAuth, handleGoogleSignIn }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, AuthProvider };