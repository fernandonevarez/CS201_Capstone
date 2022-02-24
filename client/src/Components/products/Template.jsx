import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import Price from "./Price";
import "../../styles/components/products/Template.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Template = ({ name, image, price, classAddition, _id: productID }) => {
  const { user, dispatch } = useUser();

  console.log("id", productID);

//   console.log("images", image);

  const addToFavorites = async (userID, productID) => {
    // console.log("added to favorites");
    // getProduct(productID);
    const response = await axios
      .put(
        `http://localhost:3000/api/v1/auth/updateUser/${user.details.user._id}`,
        {
          wantsUpdating: "addToFavorites",
          data: { userID: userID, productID: productID },
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
        }}
      ).then((response) => {
        console.log("added to favorites", response.data);
        // dispatch({ type: "favorite", payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromFavorites = async (userID, productID) => {
    console.log("removed from favorites");
    console.log("userID", userID);
    console.log("productID", productID);
  };

  // console.log("image", image);

  return (
    <div className={`product-${classAddition}`}>
      <div className="atop">
        <Link to={`/products/${productID}`}>
          <div className="image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="top">

          <Price amount={price} />
          

          {user.details.isAuthenticated ? (
            <div
            className="favorited"
            onClick={() =>
              dispatch({
                type: "favoriteToggle",
                payload: { name, image, price, id: productID },
              })
            }
          >
            {user.products.favorites.find((fav) => fav.id === productID) ? (
              <FaHeart
                onClick={() =>
                  removeFromFavorites(user.details.user._id, productID)
                }
              />
            ) : (
              <FaRegHeart
                onClick={() => addToFavorites(user.details.user._id, productID)}
              />
            )}
          </div>
          ): (null)}
        </div>
      </div>
      <div className="main">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Template;
