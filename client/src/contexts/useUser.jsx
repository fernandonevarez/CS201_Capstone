import { createContext, useContext, useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = createContext(null);

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    details: {},
    dev: {
      skipAuth: true,
    },
  });

  const [userMetadata, setUserMetadata] = useState(null);

  const {
    user: userInformation,
    webAuth,
    isAuthenticated,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();

  // console.log(getAccessTokenSilently());

  

  //   if (isAuthenticated) {
  //     const getUserMetadata = async () => {
  //       const domain = "dev-3osqrzua.us.auth0.com";

  //       try {
  //         const accessToken = await getAccessTokenSilently({
  //           audience: `https://${domain}/api/v2/`,
  //           scope: "read:current_user",
  //         });
  //         console.log(`userInformation.sub: ${userInformation.sub}`);

  //         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userInformation.sub}`;

  //         // const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         //   headers: {
  //         //     method: "GET",
  //         //     Authorization: `Bearer ${accessToken}`,
  //         //     redirected: true,
  //         //     "no-cors": true,
  //         //     "Access-Control-Allow-Origin": "http://localhost:3001",
  //         //   },
  //         // });

  //         // const response = axios.get(userDetailsByIdUrl, {
  //         //   headers: {
  //         //     Authorization: `Bearer ${accessToken}`,
  //         //     redirected: true,
  //         //     "no-cors": true,
  //         //     "Access-Control-Allow-Origin": "http://localhost:3001",
  //         //   },
  //         // });

  //         // console.log(response);

  //         // console.log(metadataResponse);

  //         // const url = metadataResponse.url;

  //         // const user_metadata = await fetch(url, {
  //         //   headers: {
  //         //     Authorization: `Bearer ${accessToken}`,
  //         //   },
  //         // });

  //         // const { user_metadata } = await metadataResponse.json();

  //         // console.log(user_metadata);

  //         // setUserMetadata(user_metadata);
  //       } catch (e) {
  //         console.log(e.message);
  //       }
  //     };

  //     getUserMetadata();
  //   }

  const loginUser = (newUser) => {
    setUser({ ...user, details: newUser });
  };

  const logoutUser = () => {
    setUser({ ...user, details: {} });
  };

  document.cookie = `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTc4MzM5OSwiZXhwIjoxNjQ0Mzc1Mzk5fQ.nyRWJgHzwCCrXx4tsZl7jMLkAOZMaDkXzdsNUEs8PQg`;

  const userCookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );

  //   console.log(userCookies.token);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, userCookies }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
