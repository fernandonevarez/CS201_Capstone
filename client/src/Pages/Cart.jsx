import React, { useState, useEffect } from "react";
import {} from "../styles/pages/Cart.scss";

// import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useUser } from "../contexts/useUser";
import Loading from "../Components/Loading";
//temp imgs
import catImg from "../assets/images/temp/cat.png";
import { Link } from "react-router-dom";

// const token = localStorage.getItem("userToken");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWY1ZDdmMDU3YmQzYTQ1MWJjZmUyNjAiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IlRpbSIsIm1pZGRsZU5hbWUiOiJLZXZpbiIsImxhc3ROYW1lIjoiUGhpbGwifSwiaWF0IjoxNjQzNTAxNjAwLCJleHAiOjE2NDYwOTM2MDB9.4sQiB07AI1GRc5Sp4AvE_5ds0zwe9AUo9yuQNBJN8A4`;

const Cart = () => {
  // const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const [hasCartItems, setHasCartItems] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { user, userCookies } = useUser();

  console.log(userCookies.token);

  const cart = user.details.user.cart;

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
    setIsLoading(false);
  };

  useEffect(() => {
    UserCart();
    if (cart.length > 0) {
      setHasCartItems(true);
    }
  }, []);

  // console.log(`User Auth Status: ${isAuthenticated}`);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="cart-page">
      <div className="cart-page-container">
        {/* actual cart sect */}
        <section className="cart-div">
          <div className="cart-title">
            <h2>Cart</h2>
          </div>

          {hasCartItems ? (
            cart.map((product) => {
              return (
                <Link
                  to={`/products/${product._id}`}
                  className="product-container"
                  key={product._id}
                >
                  <div className="left">
                    <img src={product.imageArray[0]} alt="placeholder" />

                    <div className="product-description">
                      <h3>{product.description}</h3>
                    </div>
                  </div>

                  <div className="right">
                    <div className="product-info">
                      <div className="info-wrapper">
                        <h3 id="product-name">{product.name}</h3>
                        {/* <h3 id="product-quantity">{product.quantity}</h3> */}
                        <h3 id="product-price">${product.price / 100}</h3>
                      </div>
                    </div>
                    <div className="button-wrapper">
                      <button className="button" id="svl">Save For Later</button>
                      <button className="button" id="rmve">Remove</button>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
            </div>
          )}
        </section>
        {/* checkout sect */}
      </div>
    </main>
  );

  {
    /* total price */
  }
  {
    /* // <section className="cart-price">
        //   <div>
        //     {" "}
        //     <h2>Item(s) Total</h2> <h3>8.00</h3>{" "}
        //   </div>
        //   <div>
        //     {" "}
        //     <h2>Shipping</h2> <h3>79.00</h3>{" "}
        //   </div>
        //   <hr />
        //   <div>
        //     {" "}
        //     <h2>Total</h2> <h3>87.00</h3>{" "}
        //   </div>
        // </section> */
  }

  {
    /* // <button */
  }
  //   onClick={() => {
  //     checkout();
  //   }}
  // >
  //   <h1>Checkout</h1>
  // </button>
  //   </div>
  // </main>
};

export default Cart;
