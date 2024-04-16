import React, { useContext } from "react";
import { HiHome, HiChat, HiLogout, HiInformationCircle, HiChatAlt } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import SideBarElement from "./SideBarElement";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const SideBar = ({ hamburgerData, setIsChatsOpen }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [hamburgerVisible, setHamburgerVisible] = hamburgerData;
  return (
    <aside
      id="sidebar"
      className={`bg-slate-800 h-screen w-full lg:w-60 p-4 ${
        hamburgerVisible ? "flex relative" : "hidden"
      } lg:flex text-white flex-col`}
    >
      {/* Hamburger close */}
      <button
        className="text-white lg:hidden absolute top-6 right-6"
        onClick={() => setHamburgerVisible(false)}
      >
        <AiFillCloseCircle className="w-6 h-6" />
      </button>
      {/* Home */}
      <SideBarElement
        icon={<HiHome />}
        text="Home"
        to="/"
        clickFunc={() => {
          setHamburgerVisible(false);
        }}
      />
      {/* About Us */}
      <SideBarElement
        icon={<HiInformationCircle />}
        text="About Us"
        to="/about"
        clickFunc={() => {
          setHamburgerVisible(false);
        }}
      />
      {/* Profile page */}
      <SideBarElement
        icon={<FaUserEdit />}
        text="Profile"
        to="/profile"
        clickFunc={() => {
          setHamburgerVisible(false);
        }}
      />
      <div className="w-full h-[1px] bg-gray-600 rouned-md"></div>
      {/* Chatroom */}
      <SideBarElement
        icon={<HiChat />}
        text="Chatroom"
        to="/chatroom"
        clickFunc={() => {
          setHamburgerVisible(false);
        }}
      />
      <SideBarElement
        icon={<HiChatAlt />}
        text="Chat Page"
        to=""
        clickFunc={() => {
          setIsChatsOpen((prev) => !prev);
          setHamburgerVisible(false);
        }}
      />
      {/* Seperator */}
      <div className="w-full h-[1px] bg-gray-600 rouned-md"></div>
      {/* Logout */}
      <SideBarElement
        icon={<HiLogout />}
        text="Logout"
        clickFunc={() => {
          setHamburgerVisible(false);
          logout();
          navigate("/signin");
        }}
        classes={
          "bg-blue-500 hover:bg-blue-600 mt-4 rounded-md  text-white font-semibold w-full flex items-center p-2"
        }
      />
    </aside>
  );
};

export default SideBar;
