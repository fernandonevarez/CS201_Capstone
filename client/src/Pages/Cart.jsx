import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const cart = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

// const token = localStorage.getItem("userToken");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTc4MzM5OSwiZXhwIjoxNjQ0Mzc1Mzk5fQ.nyRWJgHzwCCrXx4tsZl7jMLkAOZMaDkXzdsNUEs8PQg`;

const Cart = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  async function checkout() {
    const checkout = await axios.post(
      "http://localhost:3000/api/v1/create-checkout-session",
      cart,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001/cart",
      }
    );
    const stripeURL = checkout.data.url;
    window.location = stripeURL;
  }

  console.log(`User Auth Status: ${isAuthenticated}`);

  return (
    <main className="cart-page">
      <Navbar />
      <div className="cart-page-container">
        <h1>Put the user's cart here</h1>

        <button
          onClick={() => {
            checkout();
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
};

export default Cart;
