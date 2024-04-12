import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../components/ProfileIcon";

const ProfilePage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  window.document.title = "Profile";
  const { user, isAuth } = useContext(UserContext);
  const [username, setUsername] = useState();

  useEffect(() => {
    const metaData = user?.user_metadata;
    if (metaData?.full_name) {
      setUsername(metaData?.full_name);
    } else if (metaData?.username) {
      setUsername(metaData?.username?.split("@")[0]);
    } else {
      setUsername("Guest");
    }
  }, [isAuth, user]);

  return (
<div className="flex flex-col min-h-screen bg-gray-950">
  <main className="flex-grow flex items-center justify-center">
    <div className="flex flex-col items-center max-w-md p-8 rounded-lg bg-gray-900">
      <h2 className="text-4xl font-bold text-white mb-8">Profile</h2>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-4xl">
          <ProfileIcon/>
        </div>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">{username}</h1>
      </div>
      <div className="text-gray-300 mb-6">
        <p className="mb-2">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Location: Earth</p>
      </div>
    </div>
  </main>
</div>
  );

}

export default ProfilePage;