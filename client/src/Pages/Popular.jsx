import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useUser } from "../contexts/useUser";
import axios from "axios";

// probelm that i ran into and still in to fix
/*
  1. no products show on the page because for some reason all the products have 0 likes
      - The reason why it's like this because in the product Models I have the likes field as 0
*/

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [popluarProducts, setPopluarProducts] = useState([]);

  const { userCookies } = useUser();

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/products`,
        {
          headers: {
            Authorization: `Bearer ${userCookies.token}`,
            "Access-Control-Allow-Origin": "http://localhost:3001",
          },
        }
      );
      console.log("response", response.data.products);
      setProducts(response.data.products);
    };
    getProducts();

    // filter the products by popularity
    const filterProducts = () => {
      const filteredProducts = products.filter((product) => {
        console.log("product likes", product.likes);
        return product.likes > 0;
      });
      console.log("filteredProducts", filteredProducts);
      setPopluarProducts(filteredProducts);
    };
    filterProducts();
  }, []);

  return (
    <div className="popluar-container">
      <Navbar />
      <div className="popular-content"></div>
    </div>
  );
};

export default Popular;
