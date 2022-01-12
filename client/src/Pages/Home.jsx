import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
// import axios
import axios from "axios";
import LoginForm from "../Components/LoginForm";
import Register from "../Components/Register";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";

const token = localStorage.getItem("userToken");

const chart = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

const Home = () => {
  // call axios to get backend data
  // const [data, setData] = useState([]);
  // const [productData, setProductData] = useState([]);
  const [results, setResults] = useState({});

  async function getProducts() {
    const response = await axios.get("http://localhost:3000/api/v1/products", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
    });
    // console.log(response);
    // console.log(response.data.products);
    setResults(response.data);
    // response.data returns an length and and array of objects
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function checkout() {
    const checkout = await axios.post(
      "http://localhost:3000/api/v1/create-checkout-session",
      chart,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      }
    );
    const stripeURL = checkout.data.url;
    window.location = stripeURL;
  }

  // console.log(results);

  // console.log(`Product Array: ${results.products}`);

  const getImage = (imageArray) => {
    const image = axios.get(imageArray[0]);
    return image;
    // console.log(imageArray[0]);
  };

  return (
    <div>
      <Navbar />

      <button
        onClick={() => {
          checkout();
        }}
      >
        Checkout
      </button>

      <LoginButton/>
      <br />
      <LogoutButton />

      {/* <LoginForm /> */}
      {/* <Register /> */}

      {results.products?.map((product) => {
        const { _id: id, imageArray, name, description, price } = product;
        console.log(imageArray);
        return (
          <div className="product-container" key={id}>
            <h3>{name}</h3>
            <img src={imageArray[0]} alt={name} />
            <div className="product-info">
              <p>{description}</p>
              <p>&#36;{price}</p>
              <button>Add to cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
