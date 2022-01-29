import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../styles/pages/Error.scss";

const Error = () => {
  return (
    <>
      <div className="error-container">
        <h1>Uh Oh!</h1>
        <p>This page seems to not exist</p>
      </div>
    </>
  );
};

export default Error;
