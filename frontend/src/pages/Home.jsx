/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  window.document.title = "EchoRealm";
  const [username, setUsername] = useState();
  const { user, isAuth } = useContext(UserContext);

  // Get the redirect-back param from the URL
  // const urlParams = new URLSearchParams(window.location.search);
  // const redirectBack = urlParams.get('redirect-to');

  // useEffect(() => {
  //   if (redirectBack) {
  //     navigate(`/${redirectBack}`);
  //   }
  // }, [redirectBack, navigate]);

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
    <div className="flex main-image-area min-h-screen min-w-fit flex-col">
      <div className="flex text-white font-sans items-center justify-center text-center text-3xl pt-40">
        <div className="bg-slate-900 px-6 py-3 rounded-md">
          Welcome {username} !
        </div>
      </div>
    </div>
  );
}

export default Home;
