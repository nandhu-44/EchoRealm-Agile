import React from "react";

function NotFound() {
  return (
    <div className=" flex flex-row bg-slate-950 h-screen p-20 items-center justify-center">
      <h1 className="text-red-600 font-semibold text-3xl">
        Error 404: <span className="text-white"> Page Not Found</span>
      </h1>
    </div>
  );
}

export default NotFound;
