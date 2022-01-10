import React, {useState, useEffect} from "react";

import {BsCart4} from "react-icons/bs";
// import {GiHamburgerMenu} from "react-icons/gi";
import {RiMenu3Fill} from "react-icons/ri"
import {FaSearch, FaTimes, FaChevronRight} from "react-icons/fa"

import "../styles/components/Navbar.scss"
import Register from "./Register";
import Signup from "./Signin";

const SAMPLE_DATA_REMOVE_LATER = [
  {
    name: "On Sale",
    id: 1,
    children: [],
  },
  {
    name: "3D Printed",
    id: 2,
    children: [],
  },
  {
    name: "Stickers",
    id: 3,
    children: [],
  },
  {
    name: "Jewlery",
    id: 4,
    children: [],
  },
  {
    name: "Art",
    id: 5,
    children: [],
  },
]

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [catagories, setCatagories] = useState(SAMPLE_DATA_REMOVE_LATER);


  const close = () => setPopup(pop => ({...pop, open: false}))

  const change = () => {
    setPopup(
      pop => ({
        ...pop,
        id: (pop.id + 1) % 2,
        content: (pop.id + 1) % 2
          ? <Register change={change} close={close} />
          : <Signup change={change} close={close} />
      })
    )
  }

  const [popup, setPopup] = useState({
    id: 0,
    open: false,
    content: <Signup change={change} close={close} />
  });




  return (
    <nav>
      <div className="bar">
        <div className="top">
          <div className="title">
            <h1>MSB</h1>
          </div>
          <div className="search">
            <label htmlFor="search">
              <input type="text" name="search" id="search" placeholder="Lookup Items" autoCorrect="false" />
              <div className="search-icon">
                <FaSearch />
              </div>
            </label>
          </div>
        </div>
        <div className="bottom">
          <div className="hamburger-icon" onClick={() => setShowMenu(sm => !sm)}>
            <RiMenu3Fill />
          </div>
          <div className="side">
            <div className="button" onClick={() => setPopup(pop => ({...pop, open: true}))}>Sign In</div>
            <div className="cart-icon">
              <BsCart4 />
            </div>
          </div>
        </div>
      </div>
      <div className={`menu ${showMenu ? "show" : ""}`}>
        <div className="hide"></div>
        <div className="content">
          <div className="top">
            <h2>Browse Catagories</h2>
            <div className="exit-icon" onClick={() => setShowMenu(false)}>
              <FaTimes />
            </div>
          </div>
          <ul className="navigate">
            {catagories.map(({name, children, id}) => <li key={id}>
              <h3>{name}</h3>
              <div className="continue-icon">
                <FaChevronRight />
              </div>
            </li>)}
          </ul>
        </div>
      </div>
      {popup.open && popup.content}
    </nav>
  )

  // return (
  //   <nav className="navbar-container">
  //     <div className="logo-wrapper">
  //       <img src="#" alt="company logo" className="logo" />
  //     </div>
  //     <div className="button-wrapper">
  //       <button className="sign-in-button">Sign In</button>
  //       <BsCart4 className="cart-icon" />
  //     </div>
  //     <div className="search-bar-wrapper">
  //       <input type="text" className="search-bar" placeholder="Search" />
  //     </div>
  //     <div className="hambuger-wrapper">
  //       <GiHamburgerMenu
  //         onClick={() => setShowMenu(!showMenu)}
  //         className="hambuger-icon"
  //       />
  //     </div>

  //     {showMenu ? (
  //       <div className="category-wrapper">
  //         <button className="category">Toys &amp; Entertainment</button>
  //         <button className="category">New</button>
  //         <button className="category">Popular</button>
  //       </div>
  //     ) : null}
  //   </nav>
  // );
};

export default Navbar;
