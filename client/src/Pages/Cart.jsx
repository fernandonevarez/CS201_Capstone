import React, { useState, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Components/Navbar";

const Cart = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  console.log(isAuthenticated);
  return (
    <main className="cart-page">
      <Navbar />
      <div className="cart-page-container">Put the user's cart here</div>
    </main>
  );
};

export default Cart;
