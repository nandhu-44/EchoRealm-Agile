import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { IoReloadCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Header from "../components/Header";

const Profile = () => {
  window.scrollTo(0, 0);
  const { user } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    if (user) {
      setUserDetails(user);
    }
  }, [user]);

  return (
    <section className="">
      <Header/>
      <div className="flex items-start mt-20 justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="px-4 py-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-white text-center text-2xl font-semibold">
              User Profile
            </h2>
            <div className="flex flex-col">
              {/* This div to have all contents */}
              <div className="flex flex-row items-center">
                {/* Image and username */}
                {/* Image */}
                <div className="flex items-center justify-center  bg-clip-border bg-gradient-to-br from-blue-500 via-pink-600 to-amber-600 p-[2px] rounded-full">
                  {userDetails?.profilePicture ? (
                    <div className="relative">
                      <img
                        src={userDetails?.profilePicture}
                        alt="Profile Picture"
                        className="size-16 md:size-24 rounded-full"
                      />
                      <button className="absolute bottom-0 right-0 bg-green-600 rounded-full p-0">
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
                      {userDetails?.username}
                    </p>
                    <div className="bg-green-600  rounded-full">
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
                  <div className="bg-green-600  rounded-full">
                    <IoReloadCircle className="h-6 w-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>
                <p className="text-blue-400 text-sm text-wrap lg:text-base bg-gray-900 p-1 md:p-[6px] rounded-md mt-1 md:mt-2">
                  {userDetails?.bio ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
