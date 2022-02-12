import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {} from "../styles/pages/ToysAndEntertainment.scss";

import Product from "../Components/products/Product";

import { useUser } from "../contexts/useUser";

import axios from "axios";
import Loading from "../Components/Loading";

const Toys = () => {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/products`, {
      headers: {
        Authorization: `Bearer ${user.details.token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
    });
    console.log("response", response.data.products);
    // setProducts(response.data.products);
    setProducts(
      response.data.products.filter((product) => {
        // console.log("product type", product.type);
        // loop through the product's type array and check to see if there is a type of "toys"
        for (let i = 0; i < product.type.length; i++) {
          if (product.type[i] === "toy") {
            // console.log("product", product);
            return product;
          }
        }
      })
    );
    setIsLoading(false);
    // console.log("product likes", product.likes);
  };

  console.log("products", products);

  return (
    <div className="page-container">
      <div className="products-container">
        <h2>Toys</h2>

        {/* display the products */}

        {isLoading ? (
          <Loading />
        ) : (
          products.map(
            //(product) => {
            // <Product
            //   key={product._id}
            //   id={product._id}
            //   image={product.imageArray[0]}
            //   name={product.name}
            //   price={product.price}
            //   description={product.description}
            //   likes={product.likes}
            // />;

            ({ _id: id, imageArray: image, ...rest }) => (
              <Product key={id} image={image[0]} id={id} {...rest} />
            )
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Toys;
