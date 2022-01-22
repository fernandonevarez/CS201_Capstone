
import React, {useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';

const NewProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/api/v1/products/new', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3001',
        },
      });
      const data = await response.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);


  return (
    // <Navbar/>
    <div className="newProdcuts">

    </div>
    );
};

export default NewProducts;
