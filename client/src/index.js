import React from "react";
import ReactDOM from "react-dom";
// import "./styles/main.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

// import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./contexts/useUser";

ReactDOM.render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain="dev-3osqrzua.us.auth0.com"
      clientId="WQyqDVXVtg4xf24rnoMtZlE5r6cJpZid"
      redirectUri={window.location.origin}
      audience="https://dev-3osqrzua.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    > */}
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
