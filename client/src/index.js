import React from "react";
import ReactDOM from "react-dom";
// import "./styles/main.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
// import { AppProvider } from "./utils/context";

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    {/* <AppProvider> */}
    <Auth0Provider
      domain="dev-3osqrzua.us.auth0.com"
      clientId="WQyqDVXVtg4xf24rnoMtZlE5r6cJpZid"
      redirectUri={window.location.origin}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>


    {/* </AppProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);