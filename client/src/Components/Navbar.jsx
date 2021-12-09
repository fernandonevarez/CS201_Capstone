import React, { useState } from "react";
// import logo from "../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showlinks, setShowLinks] = useState(false);
  return (
    <div className="navbar-container">
      <img className="logo" src="#" alt="company logo" />

      <GiHamburgerMenu
        className="hambuger"
        onClick={() => setShowLinks(!showlinks)}
      />

      {showlinks ? (
        <ul>
          <li>
            p<a href="#">Home</a>
          </li>
          <li>
            <a href="#"></a>
          </li>
          <li>
            <a href="#">local Attractions</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      ) : (
        <ul></ul>
      )}
    </div>
  );
};

export default Navbar;
