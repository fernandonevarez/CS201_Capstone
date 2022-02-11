import React, { useState, useEffect, useRef } from "react";
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
  const [display, setDisplay] = useState([]);


  const { userCookies } = useUser();

  const productsRef = useRef(null);
  const pRef = useRef(null);


  useEffect(() => {
    if (pRef.current && productsRef.current) {
      let bounds = pRef.current.getBoundingClientRect();
      const resize = (e) => bounds = e.innerWidth / 100 * 40;
      const scroll = (e) => {
        if (e.scroll % bounds > 1) {
  
        }
      }
  
      window.addEventListener("resize", resize)
      productsRef.current.addEventListener("scroll", scroll)

      return () => {
        window.removeEventListener("resize", resize);
        productsRef.current.removeEventListener("scroll", scroll)
      }
    } 
  }, [productsRef, pRef]);
  
  
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
  
        // --------------------------------------- //
        // IMPLEMENT PRODUCT SORTING FUNCTIOANLITY //
        // THEN THIS PAGE WILL BE MOSTLY DONE      //
        // --------------------------------------- //
  
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ //
  
        return true
      }))
      setDisplay(response.data.products.slice(0, 8))
    };
    getProducts();
  }, []);


  return (
    <main className="popular">
      <div className="products" ref={productsRef}>
      {
          popluarProducts.length > 0
            ? popluarProducts.map(({_id: id, imageArray: image, ...rest}) => <Product key={id} id={id} image={image[0]} {...rest} />)
                // console.log("product", product);
                // console.log(`product:`, product);
                // <h1>hello</h1>;
            : // map over products
              products.map(({_id: id, ...rest}) => <Product key={id} id={id} {...rest} />)
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
