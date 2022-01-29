import React, { useState, useEffect } from "react";

// import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useUser } from "../contexts/useUser";

const cart = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

// const token = localStorage.getItem("userToken");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTc4MzM5OSwiZXhwIjoxNjQ0Mzc1Mzk5fQ.nyRWJgHzwCCrXx4tsZl7jMLkAOZMaDkXzdsNUEs8PQg`;

const Cart = () => {
  // const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const { userCookies } = useUser();

  console.log(userCookies.token);

  async function checkout() {
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
  }

  // console.log(`User Auth Status: ${isAuthenticated}`);

  return (
    <main className="cart-page">
      <Navbar />
      <div className="cart-page-container">
        {/* actual cart sect */}
        <section className="cart-div">
          <div className="cart-title">
            <h1>Cart</h1>
          </div>
          <div className="products">
            <img
              src="/static/media/temp.d2cb68eb6f97044b2712.jpg"
              alt="placeholder"
            />
            <div className="info">
              <h2 id="product-price"> holder </h2>
              <h2 id="product-name"> holder </h2>
              <button id="">Save For Later</button>
              <button id="">Remove</button>
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
