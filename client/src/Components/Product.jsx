import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

// import "../styles/components/Product.scss";

/*
  Things that still need to be done on this conpoent:
  1. After Ethan is done with the Auth0 integration, finish the "add to favorites" feature
*/

const Product = (product) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const { _id: id, imageArray, price, name } = product.product;

  const addToFavorites = async (id) => {
    // still need to get the user's id
    setIsFavorited(!isFavorited);
    if (isFavorited == false) {
      console.log("product added to user's favorites");
      console.log("product ID:", id);
    } else {
      console.log("product removed from user's favorites");
    }
  };

  if (imageArray) {
    return (
      <div className="product-card">
        <Link to={`/products/${id}`} key={id}>
          <img src={imageArray[0]} alt="product Image" />

          <div className="bottom">
            <h3>{name}</h3>
          </div>
        </Link>
        <div className="top">
          <div className="price-tag">${price / 100}</div>

          {isFavorited ? (
            <FaHeart
              onClick={() => {
                addToFavorites(id);
              }}
              className="icon"
              style={{
                strokeWidth: "50px",
                width: "50px",
                height: "50px",
                stroke: "black",
                overflow: "visible",
              }}
              size="40px"
              color="red"
            />
          ) : (
            // <img src={favImage} alt="favorited" />
            <FaRegHeart
              onClick={() => {
                // setIsFavorited(!isFavorited);
                addToFavorites(id);
              }}
              className="icon"
              style={{
                // borderColor: "black",
                strokeWidth: "10px",
                fill: "black",
                // border: "1px solid black",
                width: "50px",
                height: "50px",
                stroke: "black",
                overflow: "visible",
              }}
              size="40px"
              color="transparent"
            />
          )}
        </div>
      </div>
    );
  } else {
    console.log("imageArray is empty");
    return null;
  }

  // console.log("imageArray", imageArray[0]);
};

export default Product;
