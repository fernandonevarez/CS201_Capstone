import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import Price from "./Price";
import "../../styles/components/products/Template.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Favorite from "./Favorite";

import { useMediaQuery } from "react-responsive";

const Template = ({
  name,
  image,
  price,
  classAddition,
  _id: productID,
  orgin,
}) => {
  const { user, dispatch } = useUser();

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  // console.log("isMobile", isMobile);

  // console.log("id", productID);

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
          },
        }
      )
      .then((response) => {
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

  // const [styles, setStyles] = useState({});

  // if (orgin == "favorites") {
  //   setStyles({ minWidth: "100vw !important" });
  // }

  console.log("orgin", orgin);

  return (
    <div
      className={`product-${classAddition}`}
      // if the product is in favorites, set the min width to 100vw
      style={{
        minWidth: orgin === "favorites" && isMobile === true ? "100vw" : "",
        width: orgin === "favorites" && isMobile === false ? "80vw" : "",
        margin:
          orgin === "favorites" && isMobile === false
            ? "0 6rem  0 6rem !important"
            : "0",
      }}
    >
      <div className="atop">
        <Link to={`/products/${productID}`}>
          <div className="image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="top">
          <Price amount={price} />

          <Favorite orgin={orgin} productID={productID} />
        </div>
      </div>
      <div className="main">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Template;
