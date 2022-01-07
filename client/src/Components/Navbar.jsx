import React, { useState, useEffect } from "react";

import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className="navbar-container">
      <div className="logo-wrapper">
        <img src="#" alt="company logo" className="logo" />
      </div>
      <div className="button-wrapper">
        <button className="sign-in-button">Sign In</button>
        <BsCart4 className="cart-icon" />
      </div>
      <div className="search-bar-wrapper">
        <input type="text" className="search-bar" placeholder="Search" />
      </div>
      <div className="hambuger-wrapper">
        <GiHamburgerMenu
          onClick={() => setShowMenu(!showMenu)}
          className="hambuger-icon"
        />
      </div>

      {showMenu ? (
        <div className="category-wrapper">
          <button className="category">Toys &amp; Entertainment</button>
          <button className="category">New</button>
          <button className="category">Popular</button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
