import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { FaSearch, FaTimes } from "react-icons/fa";

import axios from "axios";

import { useUser } from "../contexts/useUser";

import "../styles/components/Search.scss";
// import Menu from "./Menu";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWY4N2IxOGY3N2YzNDcwYmNmOWM0MGMiLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkRhdnVkIiwibGFzdE5hbWUiOiJFdGFnc2duIn0sImlhdCI6MTY0MzY3NDcxOCwiZXhwIjoxNjQ2MjY2NzE4fQ.iZOj-KAmExWiJRvgKg-kFpprl8XFmIc4Z4f14jW0qmk";

const Search = ({ setShowNavbar, showNavbar, toggleMenu, showMenu }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useUser();

  const getProducts = async () => {
    console.log("user token", user.details.token);
    const response = await axios.get("http://localhost:3000/api/v1/products", {
      headers: {
        Authorization: `Bearer ${user.details.token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
    });
    
    console.log("response", response);
    setProducts(response.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log("token", user.details.token);

  let filteredProducts = () => {
    return products
      .filter((product) => {
        if (query === "") {
          // chnage it in the future to where only the most popular products are shown
          return product;
        } else if (product.name.toLowerCase().startsWith(query.toLowerCase())) {
          return product;
        }
      })
      .map((product, index) => {
        console.log("name", product.name);

        const { _id: id, name } = product;

        return (
          <div className="search-suggestions-item" key={index}>
            <Link
              to={`/products/${id}`}
              onClick={() => setShowNavbar(!showNavbar)}
            >
              {name}
            </Link>
          </div>
        );
      });
  };

  console.log("products", products);

  return (
    <div className="search-conatiner">
      <div className="row">
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => {
              setQuery(e.target.value);
              // setShowNavBar(true);
              console.log("query", query);
              filteredProducts();
            }}
            placeholder="Search Items Here"
            autoCorrect="false"
          />
          <div className="search-icon">
            <FaSearch onClick={() => setShowNavbar(!showNavbar)} />
          </div>
        </label>
        <FaTimes
          className="close-search"
          onClick={() => setShowNavbar(!showNavbar)}
        />
      </div>

      <div className="search-suggestions">
        {products.length == 0 ? <h3>No Products Found</h3> : filteredProducts()}
      </div>
    </div>
  );
};

export default Search;
