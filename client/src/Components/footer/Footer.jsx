import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import "../../styles/components/Footer.scss";

import { useUser } from "../../contexts/useUser";
import Dropdown from "./Dropdown";

const Footer = () => {
  const { user } = useUser();

  const [showDropdown, setShowDropdown] = useState(false);

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
          opatialRequirement:
            "user.details.isAuthenticated && !user.details.user.hasStore",
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

  return (
    <div className="footer-container">
      {/* <div className="company-name">MSB</div>
      <div className="copy-right">Copyright @ 2022</div> */}

      {dropdownSections.map((section) => {
        return (
          <Dropdown
            name={section.name}
            links={section.links}
            id={section.id}
            key={section.id}
          />
        );
      })}
      {/* <Dropdown name={dropdownSections[0].name} links={dropdownSections[0].links} /> */}

      {/* <div className="footer-section">
        <div className="footer-section-title">About</div>
        <div className="footer-section-links">
          <Link to="/about">About MSB</Link>
        </div>
      </div> */}

      {/* <button onClick={() => setShowDropdown(!showDropdown)}>Hello</button>
      {showDropdown ? (
        <div class="content">
          <Link to="/about">About MSB</Link>
        </div>
      ) : null}

      <button onClick={() => setShowDropdown(!showDropdown)}>About</button>
      {showDropdown ? (
        <div class="content">
          <Link to="/about">About MSB</Link>
        </div>
      ) : null} */}

      {/* <div className="docs">
        <Link to={`/terms-of-use`} className="terms" id="doc">
          Terms of Use
        </Link>
        <div className="divider">|</div>
        <Link to={`/privacy-policy`} className="privacy" id="doc">
          Privacy Policy
        </Link>
      </div> */}
    </div>
  );
};

export default Footer;
