import React from "react";
import { Link } from "react-router-dom";

import "../../styles/components/footer/Footer.scss";

import { useUser } from "../../contexts/useUser";
import Dropdown from "./Dropdown";



const Footer = () => {
  const { user } = useUser();

 
  return (
    <div className="footer-container">
      <Dropdown title="About" content={<Link to="/about">About MSB</Link>} />

      {user.details.isAuthenticated ? (
        <Dropdown
          title="Sell"
          content={[
            <Link to="/selling-info">Selling on MSB</Link>,
            <Link to={`/${user.details.user._id}/store`}>Start selling</Link>,
          ]}
        />
      ) : (
        <Dropdown
          title="Sell"
          content={[<Link to="/selling-info">Selling on MSB</Link>]}
        />
      )}
    </div>
  );
};

export default Footer;
