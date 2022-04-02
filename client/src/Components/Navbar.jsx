import React, { useState, useEffect, useMemo } from "react";

import { BsCart4 } from "react-icons/bs";
// import {GiHamburgerMenu} from "react-icons/gi";
import { RiMenu3Fill } from "react-icons/ri";
import { FaSearch, FaTimes, FaChevronRight } from "react-icons/fa";

import { CgProfile } from "react-icons/cg";

import "../styles/components/Navbar.scss";
import Register from "./auth/Register";
import Signup from "./auth/Signin";
// import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import NewProducts from "../Pages/NewProducts";
// import CategoryMenu from "./CategoryMenu";
import axios from "axios";
import Menu from "./Menu";
import Search from "./Search";
import { useUser } from "../contexts/useUser";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWY1ZDdmMDU3YmQzYTQ1MWJjZmUyNjAiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IlRpbSIsIm1pZGRsZU5hbWUiOiJLZXZpbiIsImxhc3ROYW1lIjoiUGhpbGwifSwiaWF0IjoxNjQzNTAxNjAwLCJleHAiOjE2NDYwOTM2MDB9.4sQiB07AI1GRc5Sp4AvE_5ds0zwe9AUo9yuQNBJN8A4`;

// const SAMPLE_DATA_REMOVE_LATER = [
//   {
//     name: "Popular",
//     id: 1,
//     children: [],

//   },
//   {
//     name: "new",
//     id: 2,
//     children: [],

//   },
//   {
//     name: "Toys & Entertainment",
//     id: 3,

//     children: [
//       {
//         name: "Toys",
//         // make an id with the current time in milliseconds
//         id: 1,

//         children: [
//           {
//             target: "For Kids",
//             id: 1,
//           },
//           {
//             tagert: "For Teens",
//             id: 2,
//           },
//           {
//             target: "For Adults",
//             id: 3,
//           },
//           {
//             target: "Netural",
//             id: 4,
//           }
//         ]
//       }
//     ],
//   },
// ];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { user, dispatch, cartAmount } = useUser();

  // const [cartNumber, setCartNumber] = useState(0);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // update cartNumber when user logs in

  // update cartNumber when user logs in

  // if (user.details.isAuthenticated) {
  //   useEffect(() => {
  //     setCartNumber(user.details.user.cart.length);
  //   }, [user.isAuthenticated, user.details.user.cart]);
  // }

  // check if the user is logged in

  // const updateCartNumber = useMemo(() => {
  //   setCartNumber(user.details.user.cart.length);
  // }, [user.details.isAuthenticated === true]);

  // const [catagories, setCatagories] = useState(SAMPLE_DATA_REMOVE_LATER);

  // const [products, setProducts] = useState([]);
  // const [query, setQuery] = useState("");

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = async () => {
  //   // console.log("ping pong")
  //   const response = await axios.get("http://localhost:3000/api/v1/products", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Access-Control-Allow-Origin": "http://localhost:3001",
  //     },
  //   });

  //   console.log("response", response.data.products);
  //   setProducts(response.data.products);
  // };

  const toggleMenu = () => {
    if (showMenu) {
      setShowMenu(false);

      // What I am doing here is normally bad, but is okay in this one case
      document.body.style.overflowY = "auto";
    } else {
      setShowMenu(true);

      // Same here
      document.body.style.overflowY = "hidden";
    }
  };

  const close = () => setPopup((pop) => ({ ...pop, open: false }));

  const change = () => {
    setPopup((pop) => ({
      ...pop,
      id: (pop.id + 1) % 2,
      content:
        (pop.id + 1) % 2 ? (
          <Register change={change} close={close} />
        ) : (
          <Signup change={change} close={close} />
        ),
    }));
  };

  const [popup, setPopup] = useState({
    id: 0,
    open: false,
    content: <Signup change={change} close={close} />,
  });

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <nav>
      {showNavbar ? (
        // show navbar
        <div className="bar">
          <div className="top">
            <div className="title">
              <Link to="/" className="company-name">
                MSB
              </Link>
            </div>

            <div className="search">
              <label htmlFor="search">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search Items Here"
                  autoCorrect="false"
                  onClick={() => setShowNavbar(!showNavbar)}
                />
                <div className="search-icon">
                  <FaSearch />
                </div>
              </label>
            </div>

            {/* <Search /> */}
            {/* console.log("ping"); */}
          </div>
          <div className="bottom">
            <div className="hamburger-icon" onClick={() => toggleMenu()}>
              <RiMenu3Fill />
            </div>
            <div className="side">
              {/* <div
              className="button"
              onClick={() => setPopup((pop) => ({ ...pop, open: true }))}
            >
              Sign In
            </div> */}

              {/* {isAuthenticated ? (
              <div className="profile-icon">
                <CgProfile
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                />
              </div>
            ) : (
              <button className="button" onClick={() => loginWithRedirect()}>
                Log In
              </button>
            )} */}

              {user.details.isAuthenticated ? (
                <>
                  <div className="profile-icon">
                    <CgProfile
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                    />
                  </div>
                  <div className="cart-icon">
                    <Link to="/cart">
                      <BsCart4 />

                      {user.details.user.cart.length > 0
                        ? (console.log(user.details.user.cart.length),
                          (
                            <div className="badge">
                              <>{cartAmount}</>
                            </div>
                          ))
                        : null}
                    </Link>
                  </div>
                </>
              ) : (
                <div
                  className="button"
                  onClick={() => setPopup((pop) => ({ ...pop, open: true }))}
                >
                  Sign In
                </div>
              )}

              {showProfileDropdown && (
                // reroute the user to the homepage if they are not logged in
                <>
                  <div
                    className="close"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  ></div>
                  <div className="profile-dropdown">
                    <ul>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/profile"
                          onClick={() => {
                            setShowProfileDropdown(!showProfileDropdown);
                          }}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/${user.details.user._id}/store`}
                          onClick={() => {
                            setShowProfileDropdown(!showProfileDropdown);
                          }}
                        >
                          Your Store
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/orders"
                          onClick={() => {
                            setShowProfileDropdown(!showProfileDropdown);
                          }}
                        >
                          Orders
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            dispatch({ type: "logout" });
                            // replace makes it so that the user can not go back, it will take them to the homepage
                            window.location.replace("http://localhost:3001/");
                            setShowProfileDropdown(!showProfileDropdown);
                          }}
                        >
                          Log Out
                        </button>
                        {/* <Link onClick={() => {
                          console.log("logout");
                          console.log(user.details);
                          dispatch({ type: "logout" })}} to={`/`} className="dropdown-item" >
                        Logout
                        </Link> */}
                      </li>
                      <li></li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        // just show the search bar and the pop content
        <Search
          showNavbar={showNavbar}
          setShowNavbar={setShowNavbar}
          toggleMenu={toggleMenu}
          showMenu={showMenu}
        />
      )}

      <div className={`menu ${showMenu ? "show" : ""}`}>
        <Menu toggleMenu={toggleMenu} />
      </div>

      {popup.open && popup.content}
    </nav>
  );

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
