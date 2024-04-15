import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { IoReloadCircle } from "react-icons/io5";
import { FaUserCircle, FaRegEdit } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import "./Profile.css";
import {
  createRandomUserName,
  createAvatarURL,
  createRandomBio,
} from "../utils/faker";
import { Modal } from "flowbite-react";
import NotAuthRedirect from "../components/NotAuthRedirect";
import SideBar from "../components/SideBar";

const Profile = ({ hamburgerData }) => {
  window.scrollTo(0, 0);
  const { user, updateProfile } = useContext(UserContext);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldUserDetails, setOldUserDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  // Checking state change
  const [changed, setChanged] = useState(false);

  // For spinning the buttons
  const [rotatingProfilePic, setRotatingProfilePic] = useState(false);
  const [rotatingUsername, setRotatingUsername] = useState(false);
  const [rotatingBio, setRotatingBio] = useState(false);

  useEffect(() => {
    if (user) {
      setOldUserDetails(user);
      setNewProfilePicture(user?.profilePicture);
      setNewUsername(user?.username);
      setNewBio(user?.bio);
      setNewEmail(user?.email);
    }
  }, [user]);

  useEffect(() => {
    if (
      newProfilePicture !== oldUserDetails.profilePicture ||
      newUsername !== oldUserDetails.username ||
      newBio !== oldUserDetails.bio ||
      newEmail !== oldUserDetails.email
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [newProfilePicture, newUsername, newBio, newEmail, oldUserDetails]);

  function handleProfilePictureChange() {
    setNewProfilePicture(createAvatarURL());
  }

  function handleUsernameChange() {
    setNewUsername(createRandomUserName());
  }

  function handleBioChange() {
    setNewBio(createRandomBio());
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setShowModal(false);
    const response = await updateProfile(
      oldUserDetails?._id,
      newProfilePicture,
      newUsername,
      newBio,
      newEmail,
      password
    );
    setPassword("");
    if (response?.status === 200) {
      setOldUserDetails(response?.user);
      setNewProfilePicture(response?.user?.profilePicture);
      setNewUsername(response?.user?.username);
      setNewBio(response?.user?.bio);
      setNewEmail(response?.user?.email);
      alert("Profile updated successfully!");
    } else {
      alert(response?.message || "Something went wrong! Try again later.");
    }
  };

  const [hamburgerVisible, _setHamburgerVisible] = hamburgerData;

  return (
    <section className="lg:flex lg:flex-row w-full relative">
      <NotAuthRedirect />
      <SideBar hamburgerData={hamburgerData} />
      {!hamburgerVisible && (
        <div className="flex items-start mt-20 justify-center px-2 md:px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="px-4 py-6 space-y-4 md:space-y-6 md:w-[400px]">
              <h2 className="text-white text-center text-2xl font-semibold">
                User Profile
              </h2>
              <div className="flex flex-col">
                {/* This div to have all contents */}
                <div className="flex flex-row items-center">
                  {/* Image and username */}
                  {/* Image */}
                  <div className="flex items-center justify-center  bg-clip-border bg-gradient-to-br from-blue-500 via-pink-600 to-amber-600 p-[2px] rounded-full">
                    {newProfilePicture ? (
                      <div className="relative">
                        <img
                          src={newProfilePicture}
                          alt=""
                          className="size-16 md:size-24 rounded-full"
                        />
                        <button
                          className={`absolute bottom-0 right-0 bg-green-600 rounded-full p-0 ${
                            rotatingProfilePic ? "rotate-360" : ""
                          }`}
                          onClick={() => {
                            handleProfilePictureChange();
                            setRotatingProfilePic((prevState) => !prevState);
                            setTimeout(
                              () =>
                                setRotatingProfilePic(
                                  (prevState) => !prevState
                                ),
                              510
                            );
                          }}
                        >
                          <IoReloadCircle className="size-6 md:size-8 text-white" />
                        </button>
                      </div>
                    ) : (
                      <FaUserCircle className="size-16 md:size-24 rounded-full text-white" />
                    )}
                  </div>
                  <div className="flex flex-col ml-6">
                    <p className="font-bold text-white text-base lg:text-xl">
                      Username
                    </p>
                    <div className="flex flex-row space-x-6 bg-gray-900 rounded-md p-1 md:p-[6px] mt-1 md:mt-2">
                      <p className="text-blue-400  text-sm md:text-base">
                        {newUsername}
                      </p>
                      <div
                        id="username-changer"
                        className={`bg-green-600  rounded-full hover:cursor-pointer ${
                          rotatingUsername ? "rotate-360" : ""
                        }`}
                        onClick={() => {
                          handleUsernameChange();
                          setRotatingUsername((name) => !name);
                          setTimeout(() => {
                            setRotatingUsername((name) => !name);
                          }, 510);
                        }}
                      >
                        <IoReloadCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-6">
                  <div className="flex flex-row space-x-2">
                    <p className="font-bold text-white  text-base lg:text-xl">
                      Bio
                    </p>
                    <div
                      id="bio-changer"
                      className={`bg-green-600  rounded-full hover:cursor-pointer ${
                        rotatingBio ? "rotate-360" : ""
                      }`}
                      onClick={() => {
                        handleBioChange();
                        setRotatingBio((bio) => !bio);
                        setTimeout(() => {
                          setRotatingBio((bio) => !bio);
                        }, 510);
                      }}
                    >
                      <IoReloadCircle className="h-6 w-6 md:w-7 md:h-7 text-white" />
                    </div>
                  </div>
                  <p className="text-blue-400 text-sm text-wrap lg:text-base bg-gray-900 p-1 md:p-[6px] rounded-md mt-1 md:mt-2">
                    {newBio}
                  </p>
                  {/* Add email field in form */}
                  <form action="#" className="flex flex-col py-2 relative">
                    <label
                      htmlFor="email"
                      className="font-bold text-white  text-base lg:text-xl justify-between flex items-center"
                    >
                      <span>
                        Email{" "}
                        {/* <span className="text-gray-300 italic font-light  text-sm ml-2lg:text-base">
                        (Tap to edit)
                      </span> */}
                      </span>
                    </label>
                    <div className="flex flex-row justify-between items-center text-blue-400 text-sm text-wrap lg:text-base bg-gray-900 p-1 md:p-[6px] rounded-md mt-1 md:mt-2 focus:outline-none focus:ring-0">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="text-blue-400 text-sm text-wrap w-full lg:text-base bg-gray-900 focus:outline-none focus:ring-0 border-0"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <FaRegEdit className="size-4 md:size-6 text-white" />
                    </div>
                  </form>
                  {changed ? (
                    <button
                      className="bg-blue-500  rounded-md py-2 mt-2 text-white text-base font-semibold hover:bg-blue-600 focus:outline-none focus:ring-0 focus:border-blue-700"
                      onClick={() => setShowModal(true)}
                    >
                      {" "}
                      Save Changes
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {changed && (
        <Modal
          dismissible
          show={showModal}
          onClose={() => setShowModal(false)}
          className="bg-slate-950 bg-opacity-90 pt-20 md:pt-0 backdrop-blur-sm"
        >
          <Modal.Header className="font-bold text-base lg:text-xl bg-gray-800 rounded-t-md border-b-2 border-gray-600">
            <span className="text-white">Save Changes</span>
          </Modal.Header>
          <Modal.Body className="bg-gray-800 text-white rounded-b-md">
            <h1 className="font-bold text-yellow-400 text-lg lg:text-xl pb-4">
              Enter your password to save changes!
            </h1>
            <form action="#" className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="font-semibold text-white text-base lg:text-lg"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="text-blue-400 text-sm font-semibold bg-gray-900 p-1 md:p-[6px] rounded-md focus:outline-none focus:ring-0"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-blue-500  rounded-md py-2 text-white text-base font-semibold hover:bg-blue-600 focus:outline-none focus:ring-0 focus:border-blue-700"
                onClick={(e) => {
                  handleUpdateProfile(e);
                }}
              >
                Confirm Changes
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </section>
  );
};

export default Profile;
