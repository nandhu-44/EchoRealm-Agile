import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import FooterAnchorItem from "./AnchorItems/FooterAnchorItem";

function Footer() {
  return (
    <footer class="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div class="mx-auto max-w-screen-xl text-center">
        <Link
          href="#"
          class="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Logo className={"w-12 h-12"} />
          EchoRealm
        </Link>
        <p class="my-6 text-gray-500 dark:text-gray-400">
          Anonymously share your thoughts and feelings with the world.{" "}
        </p>
        <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <FooterAnchorItem to="/" text="About" />
          <FooterAnchorItem to="/premium" text="Premium" />
          <FooterAnchorItem to="/campaigns" text="Campaigns" />
          <FooterAnchorItem to="/blog" text="Blog" />
          <FooterAnchorItem to="/affiliate-program" text="Affiliate Program" />
          <FooterAnchorItem to="/faqs" text="FAQs" />
          <FooterAnchorItem to="/contact" text="Contact" />
        </ul>
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024-2025{" "}
          <a href="/#" class="hover:underline">
            EchoRealm™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
