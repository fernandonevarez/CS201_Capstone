import { createContext, useContext, useState, useEffect, useReducer } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import userReducer from "../reducers/userReducer";

// Temp Images
import duckImg from "../assets/images/temp/duck.jpg";
import catImg from "../assets/images/temp/cat.png";
import susImg from "../assets/images/temp/sus.png";
import tempImg from "../assets/images/temp/temp.jpg";
import temp2Img from "../assets/images/temp/temp2.jpg";
import temp3Img from "../assets/images/temp/temp3.jpg";

// FAKE DATA USE FOR TESTING
const SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA = [
  {
    name: "Duck",
    price: "1001",
    image: duckImg,
    favorited: true,
    id: 0,
  },
  {
    name: "Cat",
    price: "2222",
    image: catImg,
    favorited: true,
    id: 1,
  },
  {
    name: "Amongus Sus Imposter?",
    price: "05",
    image: susImg,
    favorited: true,
    id: 2,
  },
  {
    name: "Temp",
    price: "1001",
    image: tempImg,
    favorited: true,
    id: 3,
  },
  {
    name: "Temp2",
    price: "1001",
    image: temp2Img,
    favorited: true,
    id: 4,
  },
  {
    name: "Temp3",
    price: "1001",
    image: temp3Img,
    favorited: true,
    id: 5,
  },
];

// ACTUAL CONTEXT
const UserContext = createContext(null);

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {
    details: {},
    dev: {
      skipAuth: true,
    },
    products: {
      favorites: SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA,
      cart: []
    },
  });


  // const [userMetadata, setUserMetadata] = useState(null);

  // const {
  //   user: userInformation,
  //   webAuth,
  //   isAuthenticated,
  //   getAccessTokenSilently,
  //   getIdTokenClaims,
  // } = useAuth0();

  // console.log(getAccessTokenSilently());

  //   if (isAuthenticated) {
      // const getUserMetadata = async () => {
        // const domain = "dev-3osqrzua.us.auth0.com";

        // try {
        //   const accessToken = await getAccessTokenSilently({
        //     audience: `https://${domain}/api/v2/`,
        //     scope: "read:current_user",
        //   });
  //         console.log(`userInformation.sub: ${userInformation.sub}`);

          // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${userInformation.sub}`;

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
        // } catch (e) {
        //   console.log(e.message);
        // }
  //     };

  //     getUserMetadata();
  //   }

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
    <UserContext.Provider value={{ user, dispatch, userCookies }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
