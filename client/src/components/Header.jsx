import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { FaUserCircle } from "react-icons/fa";
import { FaList } from "react-icons/fa6";

const Header = ({ allowedRoutes, currentPath, hamburgerData }) => {
  // If path is not allowed
  if (!allowedRoutes.includes(currentPath)) {
    return null;
  }

  // If path is allowed
  const { user } = useContext(UserContext);
  const [hamburgerVisible, setHamburgerVisible] = hamburgerData;



  return (
    <header className="bg-gray-700 border-b border-gray-800">
      <div className="flex items-center justify-between px-2 md:px-4 lg:px-8 py-2">
        <div className="flex flex-row items-center space-x-2">
          {/* Hamburger */}
          <button
            className="lg:hidden text-slate-100 bg-gray-800 p-2 rounded-md"
            onClick={() => setHamburgerVisible(!hamburgerVisible)}
          >
            <FaList />
          </button>
          {/* Logo */}
          <Link to="/" className="flex flex-row items-center">
            <img src="/EchoRealm.svg" className="lg:size-10 size-6" alt="" />
            <h1 className="text-blue-500 mx-1 text-xl font-medium md:font-semibold">
              EchoRealm
            </h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to="/profile"
                className="flex border-2 border-blue-400 rounded-full"
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile Picture"
                    className="size-8 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="size-8 text-blue-400" />
                )}
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
