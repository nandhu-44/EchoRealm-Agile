import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Lost from "./pages/Lost";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import AboutUs from "./pages/AboutUs";

function App() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <>
      <Header
        allowedRoutes={["/", "/profile", "/about"]}
        currentPath={currentPath}
        hamburgerData={[hamburgerVisible, setHamburgerVisible]}
      />
      <Routes>
        {/* Routes when not auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password"
          element={<Navigate to="/forgot-password" />}
        />
        <Route
          path="/reset-password/:userId/:resetToken"
          element={<ResetPassword />}
        />

        {/* Routes After auth */}
        <Route path="/" element={<Home hamburgerData={[hamburgerVisible, setHamburgerVisible]}/>} />
        <Route path="/about" element={<AboutUs hamburgerData={[hamburgerVisible, setHamburgerVisible]}/>} />
        <Route path="/profile" element={<Profile hamburgerData={[hamburgerVisible, setHamburgerVisible]}/>} />

        {/* Testing */}

        {/* 404 */}
        <Route path="*" element={<Lost />} />
      </Routes>
    </>
  );
}

export default App;
