import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

import "../styles/pages/SingleProduct.scss";

import { useParams } from "react-router-dom";

import { useUser } from "../contexts/useUser";

// import { useAuth0 } from "@auth0/auth0-react";
import duckImg from "../assets/images/temp/duck.jpg";
import Footer from "../Components/Footer";
import Loading from "../Components/Loading";
import Price from "../Components/products/Price";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import Favorite from "../Components/products/Favorite";
import Product from "../Components/products/Product";

let cancel;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWY1ZDdmMDU3YmQzYTQ1MWJjZmUyNjAiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IlRpbSIsIm1pZGRsZU5hbWUiOiJLZXZpbiIsImxhc3ROYW1lIjoiUGhpbGwifSwiaWF0IjoxNjQzNTAxNjAwLCJleHAiOjE2NDYwOTM2MDB9.4sQiB07AI1GRc5Sp4AvE_5ds0zwe9AUo9yuQNBJN8A4";

const SingleProduct = () => {
  const [product, setProduct] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  const { user } = useUser();

  const getProduct = async () => {
    const response = await axios
      .get(`http://localhost:3000/api/v1/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      })
      .then((response) => {
        setProduct(response.data.product);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProduct();
  }, []);

  // console.log("userID", user.details.user.userID)

  const pushToCart = async () => {
    try {
      cancel && cancel();
      const response = await axios.put(
        `http://localhost:3000/api/v1/auth/updateUser/${user.details.user._id}`,
        {
          wantsUpdating: "addToCart",
          data: { userID: user.details.user._id, productID: product._id },
        },
        {
          cancelToken: new axios.CancelToken((canceler) => (cancel = canceler)),
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "http://localhost:3001",
            Authorization: `Bearer ${user.details.token}`,
          },
        }
      );

      // console.log("response", response.data);
    } catch (err) {
      console.log(err);
    }

    // const response = await axios.put(
    //   `http://localhost:3000/api/v1/auth/updateUser/${user.details.user._id}`,
    //   {
    //     wantsUpdating: "addToCart",
    //     data: { userID: user.details.user._id, productID: product._id },
    //   },
    //   {
    //     headers: {
    //       // "Content-Type": "application/json",
    //       // "Access-Control-Allow-Origin": "http://localhost:3001",
    //       Authorization: `Bearer ${user.details.token}`,
    //     },
    //   }
    // );
    // .then((response) => {
    //   console.log("added to cart", response.data);
    //   // dispatch({ type: "favorite", payload: response.data });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  // console.log("product", product);

  const { _id: productID, name, price, description, imageArray, likes } = product;

  console.log("product info", product);

  return (
    <main className="single-product-page">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="single-product-container">
          <div className="product-image-slide">
            {imageArray != undefined ? (
              <img src={imageArray[0]} alt="product" />
            ) : (
              <img alt="product had no image to go with it, sorry." />
            )}
          </div>

          <div className="product-info">
            <h1>{name}</h1>

            <div className="product-price-available">
              <Price amount={price}/>

              <div className="product-info-wrapper">
              <Favorite productID={productID} /> 
              <h2>In stock</h2>
              </div>

          
            </div>

            {/* product favorite */}
            
            
          




            <button onClick={() => pushToCart()}>Add to Cart</button>

            <h2 className="details">Details</h2>

            <p>{description}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default SingleProduct;
