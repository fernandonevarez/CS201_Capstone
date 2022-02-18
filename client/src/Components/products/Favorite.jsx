import React, {useEffect, useState} from 'react'
import { useUser } from '../../contexts/useUser'
import axios from 'axios'

import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Favorite = ({productID}) => {

  // console.log("productID", productID)

  const {user: {details}, dispatch} = useUser()

  const [userDetails, setUserDetails] = useState({})

  const [favorites, setFavorites] = useState([])

  


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
        }}
      ).then((response) => {
        console.log("added to favorites", response.data);
        setUserDetails({...userDetails, user: response.data.user});

        console.log("userDetails", userDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // remove from user's favorites

  const removeFromFavorites = async (userID, productID) => {
    console.log("removed from favorites");
    console.log("userID", userID);
    console.log("productID", productID);
  };

  
  useEffect(() => {
    setUserDetails(details)
  }, [details])

  console.log("userDetails", userDetails)


  return (
    <>
    {userDetails.isAuthenticated ? (
      <>
      {userDetails.user.favorites.find((fav) => {
        if(fav.id === productID) {
          return true
        }else {
          return false
        }
      }) ? (
              <FaHeart
                onClick={() =>
                  removeFromFavorites(userDetails.user._id, productID)
                  
                }
              />,
              console.log("product is in favorites")
            ) : (
              <FaRegHeart
                onClick={() => addToFavorites(userDetails.user._id, productID)}
              />,
              console.log("product is not in favorites")
            )
            }
      </>
    ) : (
      null,
      console.log("user", userDetails),
      console.log("not logged in"))
    }
    </>
  )
}

export default Favorite