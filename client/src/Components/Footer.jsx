import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/components/Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="company-name">MSB</div>
      <div className="copy-right">Copyright @ 2022</div>
      <div className="docs">
        <Link to={`/terms-of-use`} className="terms" id="doc">
          Terms of Use
        </Link>
        <div className="divider">|</div>
        <Link to={`/privacy-policy`} className="privacy" id="doc">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
