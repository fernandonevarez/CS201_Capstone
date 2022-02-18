import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../styles/pages/NewProducts.scss";

import favImage from "../assets/images/favorited.svg";
import Loading from "../Components/Loading";
import Footer from "../Components/Footer";
import Product from "../Components/products/Product";

import { useUser } from "../contexts/useUser";
import axios from "axios";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  const getProduct = async () => {
    const response = await axios
      .get("http://localhost:3000/api/v1/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.details.token}})}`,
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      })
      .then((response) => {
        setProducts(response.data.products);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  

  useEffect(() => {
    getProduct();

    const newProducts = products.filter((product) => {
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
  }, []);

  // console.log("products", products);

  // console.log("filteredProducts", filteredProducts);

  // console.log(`filterNewProducts:`, filterNewProducts);

  // console.log("length of products:", filterNewProducts.length);

  return (
    <main className="new">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="products">
          {
            filteredProducts.length > 0
              ? filteredProducts.map(
                  ({ _id: id, imageArray: image, ...rest }) => (
                    <Product key={id} image={image[0]} id={id} {...rest} />
                  )
                )
              : // console.log("product", product);
                // console.log(`product:`, product);
                // <h1>hello</h1>;
                // map over products
                products.map(({ _id: id, imageArray: image, ...rest }) => (
                  <Product key={id} image={image[0]} {...rest} />
                ))
            // console.log("product", product);
            // console.log(`product:`, product);
            // <h1>hello</h1>;
          }
        </div>
      )}
      {/* <Footer /> */}
    </main>
  );
};

export default NewProducts;
