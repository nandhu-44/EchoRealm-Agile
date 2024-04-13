import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  window.document.title = "Profile";
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user?.username ?? user?.email?.split("@")[0]);
  const [bio, setBio] = useState(user?.bio);
  const [profilePic, setProfilePic] = useState(user?.profilePicture);

  return (
    <section className="mt-10 flex justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-md">
          <h1 className="text-3xl font-serif text-red-500">Profile</h1>
          <h2 className="text-white my-4">Update your profile</h2>
          <div className="flex justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Update user profile
              }}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-64 p-2 my-2 rounded-md"
              />
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="w-64 p-2 my-2 rounded-md"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfilePic(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-64 p-2 my-2 rounded-md"
              />
              <img
                src={profilePic?? "/profile-icon.svg"}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
              <button
                type="submit"
                className="rounded-md hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 text-center align-middle"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
