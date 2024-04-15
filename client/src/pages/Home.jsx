import React from "react";
import NotAuthRedirect from "../components/NotAuthRedirect";
import SideBar from "../components/SideBar";

const Home = ({ hamburgerData }) => {
  const [hamburgerVisible, _setHamburgerVisible] = hamburgerData;
  return (
    <section className="relative">
      <NotAuthRedirect />
      <SideBar hamburgerData={hamburgerData} />
      {!hamburgerVisible && (
        <div className="flex items-start mt-20 justify-center px-2 md:px-6 py-8 mx-auto  lg:py-0 text-white">
          Hello World
        </div>
      )}

    </section>
  );
};

export default Home;
