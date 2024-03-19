import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Register() {
  window.scrollTo(0, 0);
  window.document.title = "Register | EchoRealm";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    const response = await register(email, password);
    if (response[0]) {
      navigate("/");
    } else {
      alert(response[1]?.message || "An error occurred");
    }
  };

  return (
    <section className="main-image-area">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="username@echorealm.app"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
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
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-3 h-3 mt-[2px] border border-gray-600 rounded bg-gray-700 focus:outline-none accent-blue-600"
                    required
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="terms" className="font-normal text-gray-300">
                    I accept the{" "}
                    <Link
                      className="font-medium text-blue-500 hover:underline"
                      to="/terms-and-conditions"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 hover:ring-2 focus:outline-none hover:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
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
                  className="flex flex-row items-center justify-center gap-x-2 w-full hover:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-100 hover:bg-gray-300 hover:ring-cyan-400"
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
                  className="w-full flex flex-row items-center justify-center gap-x-3 hover:ring-2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-900 hover:bg-gray-700 hover:ring-cyan-400"
                >
                  <img
                    className="h-5 w-5"
                    src="/assets/github-mark-white.svg"
                    alt=""
                  />
                  <p className="text-white text-base">Github</p>
                </button>
              </div>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
