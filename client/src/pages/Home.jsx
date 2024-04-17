import React, { useState } from "react";
import NotAuthRedirect from "../components/NotAuthRedirect";
import SideBar from "../components/SideBar";
import Loader from "../components/Loader";
import ChatPage from "./ChatPage";

const Home = ({ hamburgerData }) => {
  const [hamburgerVisible, _setHamburgerVisible] = hamburgerData;
  const [loading, setLoading] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  return (
    <section className="lg:flex lg:flex-row w-full relative">
      <NotAuthRedirect />
      <SideBar hamburgerData={hamburgerData} setIsChatsOpen={setIsChatsOpen} />
      {!hamburgerVisible && (
        <>
          {loading && <Loader />}
          <div
            className={`${
              loading ? "hidden" : "flex"
            } items-start mt-0 justify-center px-1 md:px-6 py-1 lg:mx-auto mx-2  lg:py-0 text-white`}
          >
            {isChatsOpen ? <ChatPage isChatsOpen={isChatsOpen} /> : null}
            {!isChatsOpen && (
              <div className="flex flex-col items-center justify-center w-full px-2 py-3 mt-8 bg-zinc-800 rounded-md">
                <h1 className="text-lg lg:text-2xl text-white py-2 mt-4">Welcome to <span className="text-blue-500">EchoRealm</span></h1>
                <p className="text-white text-center text-sm lg:text-lg">
                  Click on the chatroom button to start chatting with a random
                  person. Other features will be coming soon.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
