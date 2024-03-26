import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function ProfileIcon() {
  const { user, isAuth } = useContext(UserContext);

  const [profileIcon, setProfileIcon] = useState();

  useEffect(() => {
    if (isAuth) {
      const metaData = user?.user_metadata;
      if (metaData?.avatar_url) {
        console.log(metaData.avatar_url);
        setProfileIcon(metaData.avatar_url?.replace("lh3", "lh4"));
      } else {
        setProfileIcon("/assets/profile-icon.svg");
      }
    }
  }, [isAuth, user]);

  useEffect(() => {
    console.log("Profile icon : " + profileIcon);
  }, [profileIcon]);

  return (
    <Link
      to="/profile"
      className="rounded-full border-2 border-white bg-white mx-2"
    >
      <img src={profileIcon} className="h-8 w-8 rounded-full" alt="" />
    </Link>
  );
}

export default ProfileIcon;
