import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/useUser";
import axios from "axios";
import Product from "../Components/products/Product";
import Footer from "../Components/Footer";
import "../styles/pages/Popular.scss"

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
    // filter the products by popularity
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
      // console.log("response", response.data.products);
      setProducts(response.data.products);
      setPopluarProducts(response.data.products.filter((product) => {
        // console.log("product likes", product.likes);
        // return product.likes > 0;
  
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv //
  
        // -------------------------------------------- //
        // IMPLEMENT PRODUCT LIKE SORTING FUNCTIOANLITY //
        // THEN THIS PAGE WILL BE MOSTLY DONE           //
        // -------------------------------------------- //
  
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ //
  
        return true
      }))
    };
    getProducts();
  }, []);


  return (
    <main className="popular">
      <div className="products">
      {
          popluarProducts.length > 0
            ? popluarProducts.map(({_id: id, imageArray: image, ...rest}) => <Product key={id} image={image[0]} {...rest} />)
                // console.log("product", product);
                // console.log(`product:`, product);
                // <h1>hello</h1>;
            : // map over products
              products.map(({_id: id, ...rest}) => <Product key={id} {...rest} />)
                // console.log("product", product);
                // console.log(`product:`, product);
                // <h1>hello</h1>;
              
      }
      </div>
      <Footer />
    </main>
  );
};

export default Popular;
