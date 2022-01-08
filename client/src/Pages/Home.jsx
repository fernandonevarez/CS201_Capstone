import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
// import axios
import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTU5MjQ3OCwiZXhwIjoxNjQ0MTg0NDc4fQ.ZztCiKHlAU5LSJZYK7EVPa9qwlgyMNrUwyJnZiA06Lw`;

const chart = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

const Home = () => {
  // call axios to get backend data
  const [data, setData] = useState(null);

  // useEffect(() => {
  // axios
  //   .get("http://localhost:3000/api/v1/products", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => {
  //     setData(res.data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // console.log(data);

  async function checkout() {
    const checkout = await axios.post(
      "http://localhost:3000/api/v1/create-checkout-session",
      chart,
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );
    const stripeURL = checkout.data.url;
    window.location = stripeURL;
  }

  return (
    <div>
      <Navbar />

      <button
        onClick={() => {
          checkout();
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default Home;
