import React, {useState, useEffect} from "react";
import Navbar from "../Components/Navbar";
import "../styles/pages/Home.scss"

// import axios
import axios from "axios";
import LoginForm from "../Components/LoginForm";
import Register from "../Components/Register";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import Title from "../Components/home/Title";
import Carousel from "../Components/home/carousel/Carousel";

// Temp Images
import duckImg from "../assets/images/temp/duck.jpg"
import catImg from "../assets/images/temp/cat.png"
import susImg from "../assets/images/temp/sus.png"
import tempImg from "../assets/images/temp/temp.jpg"
import temp2Img from "../assets/images/temp/temp2.jpg"
import temp3Img from "../assets/images/temp/temp3.jpg"

const SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA = [
  {
    name: "Duck",
    price: 10.01,
    image: duckImg,
    favorited: true,
    id: 0,
  },
  {
    name: "Cat",
    price: 22.22,
    image: catImg,
    favorited: true,
    id: 1,
  },
  {
    name: "Amongus Sus Imposter?",
    price: 0.5,
    image: susImg,
    favorited: true,
    id: 2,
  },
  {
    name: "Temp",
    price: 10.01,
    image: tempImg,
    favorited: true,
    id: 3,
  },
  {
    name: "Temp2",
    price: 10.01,
    image: temp2Img,
    favorited: true,
    id: 4,
  },
  {
    name: "Temp3",
    price: 10.01,
    image: temp3Img,
    favorited: true,
    id: 5,
  },
]

const token = localStorage.getItem("userToken");

const chart = [
  {id: 1, quantity: 3},
  {id: 2, quantity: 1},
];

const Home = () => {
  // call axios to get backend data
  // const [data, setData] = useState([]);
  // const [productData, setProductData] = useState([]);
  const [results, setResults] = useState({});

  async function getProducts() {
    const response = await axios.get("http://localhost:3000/api/v1/products", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      },
    });
    // console.log(response);
    // console.log(response.data.products);
    setResults(response.data);
    // response.data returns an length and and array of objects
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function checkout() {
    const checkout = await axios.post(
      "http://localhost:3000/api/v1/create-checkout-session",
      chart,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "http://localhost:3001",
      }
    );
    const stripeURL = checkout.data.url;
    window.location = stripeURL;
  }

  // console.log(results);

  // console.log(`Product Array: ${results.products}`);

  const getImage = (imageArray) => {
    const image = axios.get(imageArray[0]);
    return image;
    // console.log(imageArray[0]);
  };

  return (
    <main className="home">
      <Navbar />

      <Title name="Favorited" />
      <Carousel items={SAMPLE_DATA_REPLACE_LATER_WITH_REAL_DATA} />
      <Title name="Popular" />
      <Title name="Recent" />
      <Title name="About" />

      <button
        onClick={() => {
          checkout();
        }}
      >
        Checkout
      </button>

      <LoginButton />
      <br />
      <LogoutButton />

      {/* <LoginForm /> */}
      {/* <Register /> */}

      {results.products?.map((product) => {
        const {_id: id, imageArray, name, description, price} = product;
        console.log(imageArray);
        return (
          <div className="product-container" key={id}>
            <h3>{name}</h3>
            <img src={imageArray[0]} alt={name} />
            <div className="product-info">
              <p>{description}</p>
              <p>&#36;{price}</p>
              <button>Add to cart</button>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Home;
