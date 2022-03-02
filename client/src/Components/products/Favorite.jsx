import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "../../contexts/useUser";
import axios from "axios";

// styling for the heart icon
import "../../styles/components/products/Favorite.scss";

import { FaHeart, FaRegHeart } from "react-icons/fa";

const Favorite = ({ productID }) => {
  // console.log("productID", productID)

  const { user, dispatch } = useUser();

  const [userDetails, setUserDetails] = useState({});

  const [favorites, setFavorites] = useState([]);

  const [alreadyInFavorites, setalreadyInFavorites] = useState(false);

  // add to user's favorites

  const addToFavorites = async (userID, productID) => {
    // console.log("added to favorites");
    // getProduct(productID);
    const response = await axios
      .put(
        `http://localhost:3000/api/v1/auth/updateUser/${userDetails.user._id}`,
        {
          wantsUpdating: "addToFavorites",
          data: { userID: userID, productID: productID },
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      )
      .then((response) => {
        console.log("added to favorites", response.data);
        dispatch({ type: "UPDATE_USER", payload: response.data });

        console.log("userDetails", userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // remove from user's favorites

  const removeFromFavorites = async (userID, productID) => {
    console.log("pong")
    const response = await axios
      .put(
        `http://localhost:3000/api/v1/auth/updateUser/${userDetails.user._id}`,
        {
          wantsUpdating: "removeFromFavorites",
          data: { userID: userID, productID: productID },
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      )
      .then((response) => {
        console.log("removed to favorites", response.data);
        dispatch({ type: "UPDATE_USER", payload: response.data });

        console.log("userDetails", userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log("details", user.details);
    setUserDetails(user.details);
  }, [user.details.token, user.details.user]);

  const checkIfInFavorites = useMemo(() => {
    // code that runs after the setting of the playerName and playerChoice. Will return "Win", "Lose", or "Draw"
    // console.log("userDetails -", user.details);
    if (user.details.isAuthenticated == true && user.details.user.favorites) {
      const favorites = user.details.user.favorites;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i]._id === productID) {
          setalreadyInFavorites(true);
          // return true;/
        }
      }
    } else {
      setalreadyInFavorites(false);
    }
  }, [user.details, productID]);

  // console.log("userDetails", user.details);

  return (
    <>
      {user.details.isAuthenticated  ? (
        <>
          {alreadyInFavorites ? (
            <FaHeart
              className="heart"
              onClick={() =>
                removeFromFavorites(userDetails.user._id, productID)
              }
            />
          ) : (
            <FaRegHeart
              className="heart"
              onClick={() => addToFavorites(userDetails.user._id, productID)}
            />
          )}
        </>
      ) : (
        (null)
      )}
    </>
  );
};

export default Favorite;
