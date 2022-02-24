import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../contexts/useUser";
import axios from "axios";
import Product from "../Components/products/Product";
import Footer from "../Components/Footer";
import "../styles/pages/Popular.scss";
import Loading from "../Components/Loading";

// react icons
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

// probelm that i ran into and still in to fix
/*
  1. no products show on the page because for some reason all the products have 0 likes
      - The reason why it's like this because in the product Models I have the likes field as 0
*/

const Popular = () => {
  const [products, setProducts] = useState([]);
  const [popluarProducts, setPopluarProducts] = useState([]);
  const [display, setDisplay] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const [timesLoaded, setTimesLoaded] = useState(0);
  const [scroll, setScroll] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUser();

  // useEffect(() => {
  //     const scroll = () => {

  //       setScroll(window.scrollY)
  //     }

  //     window.addEventListener("scroll", scroll)

  //     return () => {
  //       window.removeEventListener("scroll", scroll)
  //     }
  // }, []);

  // useEffect(() => {
  //   if (Math.floor(scroll / 600) > timesLoaded) {
  //     setDisplay(d => [...d, ...popluarProducts.slice(d.length, d.length + 6)])
  //     setTimesLoaded(t => t + 1)
  //   }
  // }, [scroll, timesLoaded]);

  const getProducts = async () => {
    const response = await axios
      .get(`http://localhost:3000/api/v1/products`, {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
          "Access-Control-Allow-Origin": "http://localhost:3001",
        },
      })
      .then((response) => {
        setProducts(response.data.products);
        setPopluarProducts(response.data.products);
        setDisplay(response.data.products.slice(0, 6));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setDisplay(products.slice(pageNumber * 6, pageNumber * 6 + 6));
  }, [pageNumber]);

  console.log("product length", products.length);

  console.log("product round", Math.round(products.length / 6));

  console.log("display", display);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="popular">
      <div className="products">
        {popluarProducts.length > 0
          ? display.map(
              (product) => {
                const {_id, imageArray, ...rest} = product;
                // console.log("productID", _id);
                // console.log("image", image),
              return <Product key={_id} _id={_id} image={imageArray[0]} {...rest} />
              }
            )
          : products.map(({ _id, ...rest }) => (
              <Product key={_id} _id={_id} {...rest} />
            ))}
      </div>
      <div className="action-wrapper">
        {pageNumber == 0 ? null : (
          <GrFormPreviousLink
            className="page-button"
            onClick={() => {
              setPageNumber((p) => p - 1);
            }}
          />
        )}
        {pageNumber > 0 && pageNumber != Math.round(products.length / 6) ? (
          <div className="page-number">{pageNumber + 1}</div>
        ) : null}
        {display.length < 6 || Number.isInteger(products.length / 6) ? null : (
          <GrFormNextLink
            className="page-button"
            onClick={() => {
              setPageNumber((p) => p + 1);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default Popular;
