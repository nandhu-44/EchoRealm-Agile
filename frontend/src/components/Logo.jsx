import React from "react";
import logo from "../assets/Logo.svg";

function Logo({ className }) {
  return (
    <div>
      <img src={logo} className={className} alt="Logo" />
    </div>
  );
}

export default Logo;
