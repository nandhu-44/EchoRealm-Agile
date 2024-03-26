import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
  window.scrollTo(0, 0);
  window.document.title = "Forgot Password | EchoRealm";
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { forgotPassword } = useContext(UserContext);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const response = await forgotPassword(email);
    if (response[0]) {
      setMessage('Password reset email sent. Please check your inbox.');
      navigate("/Login");
    } else {
      setMessage(response[1]?.message || "An error occurred");
    }
  };

  return (
    <section className="main-image-area">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
          Reset your password
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
          <div className="flex items-center justify-between">
            <Link
              to="/login"
              className="text-sm font-medium text-white hover:underline"
            >
              Return to login
            </Link>
            <button
              type="submit"
              onClick={(e) => handleForgotPassword(e)}
              className="text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

  );
}

export default ForgotPassword;
