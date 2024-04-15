import React from "react";
import NotAuthRedirect from "../components/NotAuthRedirect";
import SideBar from "../components/SideBar";

const Home = ({ hamburgerData }) => {
  return (
    <section className="relative">
      <NotAuthRedirect />
      <SideBar hamburgerData={hamburgerData} />
    </section>
  );
};

export default Home;
