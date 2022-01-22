import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

import { useParams } from "react-router-dom";

import { useUser } from "../contexts/useUser";

import { useAuth0 } from "@auth0/auth0-react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWUzMDc1Y2IyODkxNGRmZjJjMTZkYWUiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IlRpbSIsIm1pZGRsZU5hbWUiOiJLZXZpbiIsImxhc3ROYW1lIjoiUGhpbGwifSwiaWF0IjoxNjQyMjY4NTUxLCJleHAiOjE2NDQ4NjA1NTF9.CGunPBk6voT_LHSEL1ZEZKSogjt7QoJievoi65uV7jk";

// const token = userUser.userCookies.token;

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  let { id } = useParams();

  const { userCookies } = useUser();
  const { user } = useAuth0();

  console.log("user", user);

  console.log("id", id);

  const getProduct = async () => {
    const response = await axios
      .get(`http://localhost:3000/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      })
      .then((response) => {
        console.log(response.data.product);
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  };

  // console.log(id);
  // getProduct();
  useEffect(() => {
    getProduct();
  }, []);

  const pushToCart = async () => {
    console.log("product pushed to user's cart");

    const { _id: productID } = product;

    const userID = user.sub.split("|")[1];

    const response = await axios.post(
      `http://localhost:3000/api/v1/user/${userID}/favorites/${productID}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`cart response: ${response}`);
  };

  console.log("product", product);

  const { name, price, description, imageArray, likes } = product;

  console.log("imageArray", imageArray);
  // console.log(imageArray);
  return (
    <main className="single-product-page">
      <Navbar />

      <div className="single-product-container">
        <div className="product-image-slide">
          {/* {imageArray.map((image) => {
            return (
              <img
                key={Math.random()}
                src={image}
                alt="image of the product"
                className="product-image"
              />
            );
          })} */}
        </div>

        <div className="product-info">
          <h1>{name}</h1>
          <h2>&#65284;{price / 100}</h2>
          <p>{description}</p>
        </div>

        <button onClick={() => pushToCart()}>Add to Cart</button>
      </div>
    </main>
  );
};

export default SingleProduct;
