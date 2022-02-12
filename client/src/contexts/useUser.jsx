import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import userReducer from "../reducers/userReducer";

// Temp Images
import dragon from "../assets/images/temp/dragon.png";
import catImg from "../assets/images/temp/ct.jpg";
import doom from "../assets/images/temp/doom.png";
import minecraft from "../assets/images/temp/minecrarft.jpg";
import dogfood from "../assets/images/temp/df.jpg";
import gijoe from "../assets/images/temp/gijoe.jfif";

const SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA = [
  {
    name: "3d Printed Dragon",
    price: "1001",
    image: dragon,
    id: 0,
  },
  {
    name: "Cat Toy",
    price: "2222",
    image: catImg,
    id: 1,
  },
  {
    name: "Doom Eternal",
    price: "2500",
    image: doom,
    id: 2,
  },
  {
    name: "MineCraft",
    price: "1001",
    image: minecraft,
    id: 3,
  },
  {
    name: "Dog Food",
    price: "1001",
    image: dogfood,
    id: 4,
  },
  {
    name: "GI Joe Action Figure",
    price: "1001",
    image: gijoe,
    id: 5,
  },
];

// ACTUAL CONTEXT
const UserContext = createContext(null);

const useUser = () => useContext(UserContext);

const UserProvider = ({children}) => {
  const [user, dispatch] = useReducer(userReducer, {
    details: {
      isAuthenticated: false,
    },
    dev: {
      skipAuth: false,
    },
    products: {
      favorites: SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA,
      cart: [],
    },
    // isAuthenticated: false,
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
    <UserContext.Provider value={{user, dispatch, userCookies}}>
      {children}
    </UserContext.Provider>
  );
};

export {useUser, UserProvider};
