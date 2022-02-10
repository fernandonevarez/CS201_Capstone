import React, { useState, useEffect } from "react";

import "../styles/components/Loading.scss";

const Loading = () => {
  return (
    <div className="everything">
      <div className="loading-container">
        <svg className="load-circle">
          <circle className="circle">
          </circle>
        </svg>
        <div className="load-text">MSB</div>
      </div>
    </div>
  )
};

export default Loading;
