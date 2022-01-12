import React from "react";
import ReactDOM from "react-dom";
// import "./styles/main.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";


import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>


    
  </React.StrictMode>,
  document.getElementById("root")
);