import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/pages/NewProducts.scss";

import favImage from "../assets/images/favorited.svg";
import Product from "../Components/Product";
import Loading from "../Components/Loading";
import Footer from "../Components/Footer";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      });
      const data = await response.json();

      const newProducts = data.products.filter((product) => {
        // check to see if a product has been made in the last 24 hours and sets the filtered products to products
        const today = new Date();
        const productDate = new Date(product.createdAt);
        const diff = today - productDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days < 1) {
          return product;
        }
      });

      setFilteredProducts(newProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, [products]);

  // console.log("products", products);

  console.log("filteredProducts", filteredProducts);

  // console.log(`filterNewProducts:`, filterNewProducts);

  // console.log("length of products:", filterNewProducts.length);

  return (
    <div className="page-container">
      <Navbar />
      <div className="newProducts-conatiner">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {filteredProducts.length > 0
              ? filteredProducts.map((product) => {
                  // console.log("product", product);
                  // console.log(`product:`, product);
                  // <h1>hello</h1>;
                  return <Product key={product._id} product={product} />;
                })
              : // map over products
                products.map((product) => {
                  // console.log("product", product);
                  // console.log(`product:`, product);
                  // <h1>hello</h1>;
                  return <Product key={product._id} product={product} />;
                })}

            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
