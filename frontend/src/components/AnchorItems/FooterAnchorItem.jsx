import React from "react";
import { Link } from "react-router-dom";

function FooterAnchorItem({ to, text }) {
  return (
    <li>
      <Link className="mr-4 hover:underline md:mr-6" to={to}>
        {text ?? "Link"}
      </Link>
    </li>
  );
}

export default FooterAnchorItem;
