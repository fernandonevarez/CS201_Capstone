import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "../../contexts/useUser";
import axios from "axios";

// styling for the heart icon
import "../../styles/components/products/Favorite.scss";

import { FaHeart, FaRegHeart } from "react-icons/fa";

const Favorite = ({ productID }) => {
  // console.log("productID", productID)

  const { user, dispatch, userFavorites, setUserFavorites } = useUser();

  const [userDetails, setUserDetails] = useState({});

  const [alreadyInFavorites, setalreadyInFavorites] = useState(false);

  // console.log("user", user);

  // add to user's favorites

  const addToFavorites = async (productID) => {
    // console.log("added to favorites");
    // getProduct(productID);
    const response = await axios
      .put(
        `http://localhost:3000/api/v1/user/${user.details.user._id}/favorites`,
        {
          productID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
          },
        }
      )
      .then((response) => {
        console.log("added to favorites", response.data.user.favorites);
        dispatch({
          type: "FAVORITE",
          payload: response.data.user.favorites,
        });
        setUserFavorites(response.data.user.favorites);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // remove from user's favorites

  const removeFromFavorites = async (productID) => {
    // console.log("removed from favorites");
    const response = await axios
      .put(
        `http://localhost:3000/api/v1/user/${user.details.user._id}/favorites/${productID}`,
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
          },
        }
      )
      .then((response) => {
        console.log("removed from favorites", response.data.user.favorites);

        dispatch({
          type: "REMOVE_FROM_FAVORITES",
          payload: response.data.user.favorites,
        });
        setUserFavorites(response.data.user.favorites);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log("details", user.details);
    setUserDetails(user.details);
  }, [user.details.token, user.details.user]);

  // const checkIfInFavorites = useMemo(() => {
  //   // code that runs after the setting of the playerName and playerChoice. Will return "Win", "Lose", or "Draw"
  //   // console.log("userDetails -", user.details);
  //   if (user.details.isAuthenticated == true && user.details.user.favorites) {
  //     const favorites = user.details.user.favorites;
  //     for (let i = 0; i < favorites.length; i++) {
  //       if (favorites[i]._id === productID) {
  //         setalreadyInFavorites(true);
  //         // return true;/
  //       }
  //     }
  //   } else {
  //     setalreadyInFavorites(false);
  //   }
  // }, [user.details.user.favorites, productID]);

  // check if the product is in the user's favorites
  const checkIfInFavorites = useMemo(() => {
    // console.log("userFavorites", userFavorites);
    if (userFavorites) {
      const favorites = userFavorites;
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i]._id === productID) {
          setalreadyInFavorites(true);
          // return true;/
        }
      }
    } else {
      setalreadyInFavorites(false);
    }
  }, [userFavorites]);

  // console.log("userDetails", user.details);

  return (
    <>
      {user.details.isAuthenticated ? (
        <>
          {alreadyInFavorites ? (
            <FaHeart
              className="heart"
              onClick={() => removeFromFavorites(productID)}
            />
          ) : (
            <FaRegHeart
              className="heart"
              onClick={() => addToFavorites(productID)}
            />
          )}
        </>
      ) : null}
    </>
  );
};

export default Favorite;
