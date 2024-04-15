import React from "react";
import { Link } from "react-router-dom";

const SideBarElement = ({ icon, text, to, clickFunc, classes }) => {
  return (
    <Link
      to={to}
      onClick={() => clickFunc && clickFunc()}
      className={
        classes
          ? classes
          : "w-full flex items-center p-2 hover:text-blue-400 hover:bg-slate-600 rounded-md  text-white font-semibold"
      }
    >
      {icon}
      <span className="ml-2">{text}</span>
    </Link>
  );
};

export default SideBarElement;
