import React from "react";
import NotAuthRedirect from "../components/NotAuthRedirect";
import SideBar from "../components/SideBar";

const AboutUs = ({ hamburgerData }) => {
  const [hamburgerVisible, _setHamburgerVisible] = hamburgerData;
  return (
    <section className="lg:flex lg:flex-row relative">
      <NotAuthRedirect />
      <SideBar hamburgerData={hamburgerData} />
      {!hamburgerVisible && (
        <div className="flex items-start mt-20 justify-center px-2 md:px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="px-4 py-6 space-y-4 md:space-y-6 sm:p-8">
              <h2 className="text-white text-center text-2xl font-semibold">
                About Us
              </h2>

              <ul className="list-disc space-y-2">
                <li className="list-item bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-pink-300 font-semibold">
                  EchoRealm is a social media platform that allows users to
                  connect with each other and share their thoughts anonymously.
                </li>
                <li className="bg-clip-text list-item text-transparent bg-gradient-to-br from-blue-400 to-pink-300 font-semibold">
                  Our platform is designed to be user-friendly and easy to use.
                </li>
                <li className="bg-clip-text list-item text-transparent bg-gradient-to-br from-blue-400 to-pink-300 font-semibold">
                  We are committed to providing a safe and secure environment
                  for our users.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
