import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';

import "../../styles/components/footer/Footer.scss";

import { useUser } from "../../contexts/useUser";
import Dropdown from "./Dropdown";

import useCollapse from "react-collapsed";

const Footer = () => {
  const { user } = useUser();

  const [showDropdown, setShowDropdown] = useState([{}]);

  const dropdownSections = [
    {
      id: 1,
      name: "Sell",
      links: [
        {
          id: 1,
          name: "Selling on MSB",
          link: "/selling-info",
          opatialRequirement: null,
        },
        {
          id: 2,
          name: "Start Selling",
          // link: `/${user.details.user._id}/store`,
          link: `/:userID/store`,
          opatialRequirement: ["userAuth", "userStore"],
        },
      ],
    },
    {
      id: 2,
      name: "About",
      links: [
        {
          id: 1,
          name: "About MSB",
          link: "/about",
        },
      ],
    },
  ];

  // console.log("userID", user.details.user._id);

  // const closeDropdown = (dropdownSectionID) => {
  //   // get the dropdownsectionID and set the showDropdown to false
  //   setShowDropdown(false);
  // }

  // const content = document.getElementById("footer-dropdown-content-1");
  // if (showDropdown) {
  //   content.style.display = "block";
  //   // content.classList.remove("hide");
  // } else {
  //   // content.classList.remove("show");
  //   // content.classList.add("hide");
  //   content.style.display = "none";
  // }
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="footer-container">
      <Dropdown />

      <div className="collapsible">
        <div className="header" {...getToggleProps()}>
          <h3>Sell</h3>
          {isExpanded ? <IoIosArrowUp/> : <IoIosArrowDown/>}  
        </div>
        <div className="collapsed-panel" {...getCollapseProps()}>
          <div className="content">
            <Link to="/selling-info">Selling on MSB</Link>
            {user.details.isAuthenticated == true && user.details.user.hasStore == false ? (
              <Link to={`/${user.details.user._id}/store`}>Start Selling</Link>
            ) : null}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
