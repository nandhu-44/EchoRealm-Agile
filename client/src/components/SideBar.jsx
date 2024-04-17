import React, { useContext, useState } from "react";
import { HiHome, HiChat, HiLogout, HiInformationCircle } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import SideBarElement from "./SideBarElement";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { FaSquarePollHorizontal, FaSquarePlus } from "react-icons/fa6";
import { Modal } from "flowbite-react";

const SideBar = ({ hamburgerData, setIsChatsOpen }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [hamburgerVisible, setHamburgerVisible] = hamburgerData;
  const [showModal, setShowModal] = useState(false);
  return (
    <aside
      id="sidebar"
      className={`bg-slate-800 w-full lg:w-60 p-4 ${
        hamburgerVisible ? "flex relative" : "hidden"
      } lg:flex text-white flex-col`}
      style={{
        height: "92.1svh",
        transition: "all 0.3s",
      }}
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
          setIsChatsOpen(false);
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
        text="Join ChatRoom"
        to="/"
        clickFunc={() => {
          setIsChatsOpen((prev) => !prev);
          setHamburgerVisible(false);
        }}
      />
      {/* Polls */}
      <SideBarElement
        icon={<FaSquarePollHorizontal />}
        text="Create Polls"
        to=""
        clickFunc={() => {
          setShowModal(true);
          setHamburgerVisible(false);
        }}
      />
      {/* Posts */}
      <SideBarElement
        icon={<FaSquarePlus />}
        text="Create Posts"
        to=""
        clickFunc={() => {
          setShowModal(true);
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
      <Modal
        dismissible
        show={showModal}
        onClose={() => setShowModal(false)}
        className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0 backdrop-blur-sm"
      >
        <Modal.Header className="font-bold text-base lg:text-xl bg-gray-800 rounded-t-md border-b-2 border-gray-600">
          <span className="text-white">Under Development</span>
        </Modal.Header>
        <Modal.Body className="bg-gray-800 text-white rounded-b-md">
          <h1 className="font-bold text-blue-400 text-lg lg:text-xl pb-4">
            These features are coming soon!
          </h1>
          <p className="text-white text-sm lg:text-base">
            We are working hard to bring these features to you as soon as
            possible. Stay tuned!
          </p>
        </Modal.Body>
      </Modal>
    </aside>
  );
};

export default SideBar;
