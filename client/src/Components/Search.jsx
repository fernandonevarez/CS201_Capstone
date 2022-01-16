import React, { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTc4MzM5OSwiZXhwIjoxNjQ0Mzc1Mzk5fQ.nyRWJgHzwCCrXx4tsZl7jMLkAOZMaDkXzdsNUEs8PQg`;

const Search = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/products", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
    });

    console.log(response.data.products);
    setProducts(response.data.products);
  };

  // this area needs to be fixed For some reason the search is not working

  let filteredProducts = () => {
    return products
      .filter((product) => {
        if (query == "") {
          return product;
        } else if (product.name.includes(query.toLowerCase())) {
          return product;
        }
      })
      .map((product, index) => {
        // console.log(product.name);

        const { _id: id, name } = product;

        return (
          // this isn't being shown
          <div className="search-suggestions-item" key={index}>
            {/* <h1>{product.name}</h1> */}
            {/* Link that will go to the "/product/:id" and will pass the params the SingleProduct */}
            <Link to={`/products/${id}`}>{name}</Link>
          </div>
        );
      });
  };

  return (
    <div className="search">
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
            setQuery(e.target.value);
            console.log(e.target.value);
            filteredProducts();
          }}
          placeholder="Search Items Here"
          autoCorrect="false"
        />
        <div className="search-icon">
          <FaSearch />
        </div>
      </label>
      <div className="search-suggestions">{filteredProducts()}</div>
    </div>
  );
};

export default Search;
