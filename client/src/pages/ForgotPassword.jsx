import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import AuthRedirect from "../components/AuthRedirect";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please provide email!");
      return;
    }
    const data = await forgotPassword(email);
    if (data?.status === 200) {
      setSuccess(true);
    } else {
      alert(data?.message ?? "An error occurred");
    }
  };

  return (
    <section className="">
      <AuthRedirect />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Forgot Password
            </h1>
            {success ? (
              <div className="text-green-500">
                An email has been sent to your email address. Please check your
                inbox.
              </div>
            ) : (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  Reset Password
                </button>
                <p className="text-sm font-light  text-gray-400">
                  Remembered your password?{" "}
                  <Link
                    to="/signin"
                    className="font-medium  hover:underline text-blue-500"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
