import { createContext, useEffect, useState } from "react";
import axios from "axios";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData._id) {
      fetchUserDetails(userData._id);
    }
  }, []);

  // User Handling
  

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password,
      });
      const data = response?.data;
      if (data.status === 200) {
        setUser(data?.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Register
  const register = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/register`, {
        email,
        password,
      });
      const data = response?.data;
      if (data.status === 200) {
        setUser(data?.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Logout
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/forgot-password`,
        {
          email,
        }
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Reset Password
  const resetPassword = async (userId, resetToken, password) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/reset-password`,
        {
          userId,
          resetToken,
          password,
        }
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Update Profile
  const updateProfile = async (
    userId,
    profilePicture,
    username,
    bio,
    email,
    password
  ) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/update-profile`,
        {
          userId,
          profilePicture,
          username,
          bio,
          email,
          password,
        }
      );
      if (response?.data.status === 200) {
        setUser(response?.data?.user);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
      }
      return response?.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Fetch User Details
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/get-user-details`,
        {
          userId,
        }
      );
      const data = response?.data;
      if (data?.status === 200) {
        setUser(data?.user);
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
