import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const { UserContext } = require("../UserContext");

function Login() {
  window.scrollTo(0, 0);
  window.document.title = "Login | EchoRealm";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    if (localStorage.getItem("echorealm-user-data")) {
      navigate("/");
    }
  };

  return (
    <section className="main-image-area">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border  sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="username@echorealm.app"
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="relative flex items-center text-right justify-between">
                <Link
                  className="right-0 absolute text-sm font-medium  hover:underline text-right text-blue-500"
                  to="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Log in
              </button>
              <div className="flex flex-row justify-center items-center">
                <div className="bg-slate-400 w-20 mt-1 mx-2 rounded-xl h-[1px] items-left"></div>
                <span className="text-white text-xs">Or Continue With</span>
                <div className="bg-slate-400 w-20 h-[1px] mt-1 mx-2 rounded-xl items-left"></div>
              </div>

              <div className="flex flex-col gap-y-3 justify-center items-center">
                {/* Google button */}
                <button
                  type="button"
                  className="flex flex-row  items-center justify-center gap-x-2 w-full hover:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-100 hover:bg-gray-300 hover:ring-cyan-400"
                >
                  <img
                    className="h-5 w-5"
                    src="/assets/google-icon.svg"
                    alt=""
                  />
                  <p className="text-black text-base">Google</p>
                </button>
                {/* Github Button */}
                <button
                  type="button"
                  className="w-full flex flex-row items-center justify-center gap-x-3 hover:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-900 hover:bg-gray-700 hover:ring-cyan-400"
                >
                  <img
                    className="h-5 w-5"
                    src="/assets/github-mark-white.svg"
                    alt=""
                  />
                  <p className="text-white text-base">Github</p>
                </button>
              </div>
              <p className="text-sm font-light  text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium  hover:underline text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
