import React from "react";
import { Link } from "react-router-dom";


function Button({ to, text, onClick }) {
  return (
    <Link
      className={`text-white bg-blue-500 hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-blue-700`}
      to={to}
      onClick={onClick}
    >
      {text ?? "Button"}
    </Link>
  );
}

export default Button;
