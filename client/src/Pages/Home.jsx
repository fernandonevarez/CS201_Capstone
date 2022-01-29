import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../styles/pages/Home.scss";

// import axios
import axios from "axios";
import LoginForm from "../Components/LoginForm";
import Register from "../Components/Register";
// import LoginButton from "../Components/LoginButton";
// import LogoutButton from "../Components/LogoutButton";
import Title from "../Components/products/Title";
import Carousel from "../Components/products/carousel/Carousel";

// Temp Images
import duckImg from "../assets/images/temp/duck.jpg";
import catImg from "../assets/images/temp/cat.png";
import susImg from "../assets/images/temp/sus.png";
import tempImg from "../assets/images/temp/temp.jpg";
import temp2Img from "../assets/images/temp/temp2.jpg";
import temp3Img from "../assets/images/temp/temp3.jpg";

import Profile from "../Components/Profile";
import { useUser } from "../contexts/useUser";
import Slideshow from "../Components/products/slideshow/Slideshow";

// import { useAuth0 } from "@auth0/auth0-react";

const SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA = [
  {
    name: "Duck",
    price: 10.01,
    image: duckImg,
    favorited: true,
    id: 0,
  },
  {
    name: "Cat",
    price: 22.22,
    image: catImg,
    favorited: true,
    id: 1,
  },
  {
    name: "Amongus Sus Imposter?",
    price: 0.5,
    image: susImg,
    favorited: true,
    id: 2,
  },
  {
    name: "Temp",
    price: 10.01,
    image: tempImg,
    favorited: true,
    id: 3,
  },
  {
    name: "Temp2",
    price: 10.01,
    image: temp2Img,
    favorited: true,
    id: 4,
  },
  {
    name: "Temp3",
    price: 10.01,
    image: temp3Img,
    favorited: true,
    id: 5,
  },
];

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTc4MzM5OSwiZXhwIjoxNjQ0Mzc1Mzk5fQ.nyRWJgHzwCCrXx4tsZl7jMLkAOZMaDkXzdsNUEs8PQg`;

const Home = () => {
  // call axios to get backend data
  // const [data, setData] = useState([]);
  // const [productData, setProductData] = useState([]);
  const [results, setResults] = useState({});
  const { user } = useUser();
  // const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // async function getProducts() {
  //   const response = await axios.get("http://localhost:3000/api/v1/products", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Access-Control-Allow-Origin": "http://localhost:3001",
  //     },
  //   });
  //   // console.log(response);
  //   // console.log(response.data.products);
  //   setResults(response.data);
  //   // response.data returns an length and and array of objects
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // console.log(results);

  // console.log(`Product Array: ${results.products}`);

  const getImage = (imageArray) => {
    const image = axios.get(imageArray[0]);
    return image;
    // console.log(imageArray[0]);
  };

  // const f = async () => {
  //   // {
  //   //   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  //   //   scope: "read:current_user",
  //   // }
  //   const token = await getAccessTokenSilently({
  //     audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  //     scope: "read:current_user",
  //   });
  //   console.log(token)
  //   const {data, error} = await axios.get("http://localhost:3000/api/v1/products", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(data || error);
  // };

  useEffect(() => { 
    // f();
  }, []);
  
  return (
    <main className="home">
      <Navbar />

      {(user.dev.skipAuth || Object.keys(user.details).length) && (
        <div className="favorited">
          <Title name="Favorited" />
          <Carousel items={user.products.favorites} />
        </div>
      )}
      <div className="popular">
        <Title name="Popular" />
        <Slideshow items={SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA} />
        <Carousel items={SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA} />
      </div>
      <Title name="Recent" />
      <Title name="About" />

      <br />

      <br />

      {/* <LoginForm /> */}
      {/* <Register /> */}

      {results.products?.map((product) => {
        const { _id: id, imageArray, name, description, price } = product;
        // console.log(imageArray);
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

      <Profile />
    </main>
  );
};

export default Home;
