


import React, {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

import { FaSearch, FaTimes } from 'react-icons/fa';

import axios from 'axios';


import "../styles/components/Search.scss";
import Menu from './Menu';



const token = ''

const Search = ({setShowNavbar, showNavbar, toggleMenu, showMenu}) => {

  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    // console.log("ping pong")
    const response = await axios.get("http://localhost:3000/api/v1/products", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
    });

    // console.log("response", response.data.products);
    setProducts(response.data.products);
  };


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
        // console.log(product.name);

        const { _id: id, name } = product;

        return (
          <div className="search-suggestions-item" key={index}>
            <Link to={`/products/${id}`}>{name}</Link>
          </div>
        );
      });
  };

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
            filteredProducts();
          }}
          placeholder="Search Items Here"
          autoCorrect="false"
        />
        <div className="search-icon">
          <FaSearch onClick={() => setShowNavbar(!showNavbar)}/>
        </div>
        
      </label>
      <FaTimes className="close-search" onClick={() => setShowNavbar(!showNavbar)}/>
      </div>

      

      <div className="search-suggestions">
        {showNavbar ? console.log("not showing data") : filteredProducts()}
      </div>

    </div>
  );
};

export default Search;
