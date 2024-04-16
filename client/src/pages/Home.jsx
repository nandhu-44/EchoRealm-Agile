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
            } items-start mt-20 justify-center px-2 md:px-6 py-8 mx-auto  lg:py-0 text-white`}
          >
            {isChatsOpen ? <ChatPage isChatsOpen={isChatsOpen} /> : null}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
