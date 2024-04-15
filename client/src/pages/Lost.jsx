import React from "react";
import { Link } from "react-router-dom";

const Lost = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = user
    ? { text: "Home", link: "/" }
    : { text: "Sign In", link: "/signin" };
  return (
    <section className="h-screen flex flex-col items-center justify-center px-2">
      <div className="bg-gray-800 p-5 lg:p-8 rounded-md">
        <h1 className="text-lg lg:text-2xl font-semibold text-white"><span className="text-red-500">Error 404: </span> Page not found!</h1>
        <h2 className="text-white my-4">
          The page you are looking for doesn't exist.
        </h2>
        <div className="flex justify-center">
          <Link
            to={data.link}
            className="rounded-md hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 text-center align-middle"
          >
            Go back to {data.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Lost;
