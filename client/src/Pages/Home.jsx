import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "../styles/pages/Home.scss";

// import axios
import axios from "axios";
// import LoginForm from "../Components/auth/LoginForm";
import Register from "../Components/auth/Register";
// import LoginButton from "../Components/LoginButton";
// import LogoutButton from "../Components/LogoutButton";
import Title from "../Components/products/Title";
import Carousel from "../Components/products/carousel/Carousel";

import Profile from "../Components/Profile";
import { useUser } from "../contexts/useUser";
import Slideshow from "../Components/Slider/Slideshow";

// import { useAuth0 } from "@auth0/auth0-react";

// Temp Images
import dragon from "../assets/images/temp/dragon.png";
import catImg from "../assets/images/temp/ct.jpg";
import doom from "../assets/images/temp/doom.png";
import minecraft from "../assets/images/temp/minecrarft.jpg";
import dogfood from "../assets/images/temp/df.jpg";
import gijoe from "../assets/images/temp/gijoe.jfif";
import { Link } from "react-router-dom";

import Seat from "../Components/products/carousel/Seat";

import { motion } from "framer-motion";

import { useMediaQuery } from "react-responsive";

const SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA = [
  {
    name: "3d Printed Dragon",
    price: "1001",
    image: dragon,
    id: 0,
  },
  {
    name: "Cat Toy",
    price: "2222",
    image: catImg,
    id: 1,
  },
  {
    name: "Doom Eternal",
    price: "2500",
    image: doom,
    id: 2,
  },
  {
    name: "MineCraft",
    price: "1001",
    image: minecraft,
    id: 3,
  },
  {
    name: "Dog Food",
    price: "1001",
    image: dogfood,
    id: 4,
  },
  {
    name: "GI Joe Action Figure",
    price: "1001",
    image: gijoe,
    id: 5,
  },
];

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWY1ZDdmMDU3YmQzYTQ1MWJjZmUyNjAiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IlRpbSIsIm1pZGRsZU5hbWUiOiJLZXZpbiIsImxhc3ROYW1lIjoiUGhpbGwifSwiaWF0IjoxNjQzNTAxNjAwLCJleHAiOjE2NDYwOTM2MDB9.4sQiB07AI1GRc5Sp4AvE_5ds0zwe9AUo9yuQNBJN8A4`;

const Home = () => {
  // call axios to get backend data
  // const [data, setData] = useState([]);
  // const [productData, setProductData] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  const [newRecentProducts, setNewRecentProducts] = useState([]);

  const [popularProducts, setPopularProducts] = useState([]);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  console.log("isMobile", isMobile);

  const { user } = useUser();

  console.log("user", user);

  // useEffect(() => {
  //   if (isMobile) {
  //     // get the last 6 recent products if on mobile
  //     const newRecentProducts = recentProducts.slice(
  //       recentProducts.length - 7,
  //       recentProducts.length - 1
  //     );
  //     setNewRecentProducts(newRecentProducts);
  //   } else {
  //     // get the last 10 recent products if on desktop
  //     const newRecentProducts = recentProducts.slice(
  //       recentProducts.length - 11,
  //       recentProducts.length - 1
  //     );
  //     setNewRecentProducts(newRecentProducts);
  //   }
  // }, [isMobile]);

  // get products from backend
  const getProducts = async () => {
    const productResponse = await axios
      .get("http://localhost:3000/api/v1/products", {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      })
      .then((response) => {
        console.log("response", response.data);
        // setResults(response.data.products);
        // const popularProducts = response.data.products.filter((product) => {
        //   return product.likes > 0;
        // });
        // // if popluar products is less than 0, add random products
        // if (popularProducts.length <= 4) {
        //   const randomProducts = response.data.products.filter((product) => {
        //     return product.likes === 0;
        //   });
        //   const newPopularProducts = [...popularProducts, ...randomProducts];
        //   console.log("newPopularProducts", newPopularProducts);
        //   setPopularProducts(newPopularProducts);
        // } else {
        //   setPopularProducts(popularProducts);
        // }

        // update recent products to response data
        if (isMobile) {
          // get the last 6 recent products if on mobile
          const recentProducts = response.data.products.slice(
            response.data.products.length - 7,
            response.data.products.length - 1
          );
          setRecentProducts(recentProducts);
        } else {
          // get the last 10 recent products if on desktop
          const recentProducts = response.data.products.slice(
            response.data.products.length - 11,
            response.data.products.length - 1
          );
          setRecentProducts(recentProducts);
        }

        // setPopularProducts(response.data.products);
        // find the most popular products
        const popularProducts = response.data.products.filter((product) => {
          return product.likes > 0;
        });
        // if popluar products is less than 0, add random products
        if (popularProducts.length <= 4) {
          const randomProducts = response.data.products.filter((product) => {
            return product.likes === 0;
          });
          const newPopularProducts = [...popularProducts, ...randomProducts];
          console.log("newPopularProducts", newPopularProducts);
          setPopularProducts(newPopularProducts);
        } else {
          setPopularProducts(popularProducts);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
    getProducts();
  }, []);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <main className="home">
      {user.details.isAuthenticated ? (
        // check if user has favorited products
        // <>
        // {
        // (user.details.favorites.length > 0 || user.details.favorites != undefined) ? (
        <div className="favorited">
          {/* <Title name="Favorited" /> */}
          {/* // check if user has favorited products */}
          {/* <Carousel items={user.details.user.favorites} /> */}
          {/* checks if user's favorites is empty */}
          {user.details.user.favorites.length > 0 ? (
            <Slideshow key="32456" items={user.details.user.favorites} />
          ) : null}
        </div>
      ) : // ) : null
      // }
      // </>
      null}
      <div className="popular">
        <Title name="Popular Right Now" />

        <div className="popular-container"></div>
      </div>
      <Title name="Explore recently Added" />

      <div className="recent">
        <motion.ul
          // className="container"
          variants={container}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          {recentProducts.map((product, index) => {
            const { _id: id, imageArray, name, description, price } = product;
            // console.log(imageArray);
            return (
              <motion.li
                key={index}
                variants={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Seat
                  {...product}
                  image={product.imageArray[0]}
                  order={index}
                  key={Math.random()}
                  styles={{
                    innerWidth: "48vw",
                  }}
                />
              </motion.li>
            );
          })}
        </motion.ul>
        <Link to="/products/catagories/popular">
          <button className="btn">View All</button>
        </Link>
      </div>

      <Title name="About" />
      <div className="about">
        <div className="title">
          <h1>What is MSB?</h1>
          <Link to="/about" className="about-link">
            <button>Learn more about our story.</button>
          </Link>
        </div>

        <div className="info-sections">
          <div id="story" className="section">
            <h2 className="title">A open market place for the average joe</h2>
            <p>
              MSB is a global online marketplace, where people come together to
              make, sell, buy, and collect unique items. We’re also a community
              pushing for positive change for small businesses, people, and the
              planet.
            </p>
          </div>
          {/* Here are some of the ways we’re making a positive impact,
          together. */}

          <div id="support" className="section">
            <h2 className="title">Support independent creators</h2>

            <p>
              MSB has no warehouse – just millions of people selling the things
              they love. We make the whole process easy, helping you connect
              directly with makers to find something extraordinary.
            </p>
          </div>

          <div id="privacy" className="section">
            <h2 className="title">Peace of mind</h2>

            <p>
              Your privacy is the highest priority here on MSB and if you ever
              need assistance, we are always ready to step in for support.
            </p>
          </div>
        </div>
      </div>

      <br />

      <br />

      {/* <LoginForm /> */}
      {/* <Register /> */}

      {/* <Profile /> */}
    </main>
  );
};

export default Home;
