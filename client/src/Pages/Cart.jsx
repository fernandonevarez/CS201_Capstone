import React, { useState, useEffect } from "react";
import {} from "../styles/pages/Cart.scss";

// import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useUser } from "../contexts/useUser";

//temp imgs
import catImg from "../assets/images/temp/cat.png";

const cart = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

// const token = localStorage.getItem("userToken");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWY1ZDdmMDU3YmQzYTQ1MWJjZmUyNjAiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IlRpbSIsIm1pZGRsZU5hbWUiOiJLZXZpbiIsImxhc3ROYW1lIjoiUGhpbGwifSwiaWF0IjoxNjQzNTAxNjAwLCJleHAiOjE2NDYwOTM2MDB9.4sQiB07AI1GRc5Sp4AvE_5ds0zwe9AUo9yuQNBJN8A4`;

const Cart = () => {
  // const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const { user, userCookies } = useUser();

  console.log(userCookies.token);

  const checkout = async () => {
    const checkout = await axios.post(
      "http://localhost:3000/api/v1/create-checkout-session",
      cart,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userCookies.token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001/cart",
      }
    );
    const stripeURL = checkout.data.url;
    window.location = stripeURL;
  };

  const UserCart = async () => {

    console.log(user.details.user);

    const response = await axios.get(
      `http://localhost:3000/api/v1/user/${user.details.user._id}/cart`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001/cart",
          Authorization: `Bearer ${user.details.token}`,
        },
      }
    );
    console.log("user's cart", response.data);
  };

  useEffect(() => {
    UserCart();
  }, []);


  // console.log(`User Auth Status: ${isAuthenticated}`);

  return (
    <main className="cart-page">
      <div className="cart-page-container">
        {/* actual cart sect */}
        <section className="cart-div">
          <div className="cart-title">
            <h2>Cart</h2>
          </div>
          <div className="products">
            <img src={catImg} alt="placeholder" />
            <div className="info">
              <div className="price-name">
                <h3 id="product-price"> the sky </h3>
                <h3 id="product-name"> $yeah.00 </h3>
              </div>
              <div className="save-rmove">
                <button id="svl">Save For Later</button>
                <button id="rmve">Remove</button>
              </div>
            </div>
          </div>
        </section>

        {/* total price */}
        <section className="cart-price">
          <div>
            {" "}
            <h2>Item(s) Total</h2> <h3>8.00</h3>{" "}
          </div>
          <div>
            {" "}
            <h2>Shipping</h2> <h3>79.00</h3>{" "}
          </div>
          <hr />
          <div>
            {" "}
            <h2>Total</h2> <h3>87.00</h3>{" "}
          </div>
        </section>

        <button
          onClick={() => {
            checkout();
          }}
        >
          <h1>Checkout</h1>
        </button>
      </div>
    </main>
  );
};

export default Cart;
