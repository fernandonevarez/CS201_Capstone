import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
// import axios
import axios from "axios";

const userName = "SloppyFlipFlop";
const userPassword = "hjbhyyi&*T^*$%FYHRYUTF%$%Eytre";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTU5MjQ3OCwiZXhwIjoxNjQ0MTg0NDc4fQ.ZztCiKHlAU5LSJZYK7EVPa9qwlgyMNrUwyJnZiA06Lw`;

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const Home = () => {
  // call axios to get backend data
  const [data, setData] = useState(null);

  useEffect(() => {
    const products = axios
      .get("http://localhost:3000/api/v1/products", {
        // auth: {
        //   username: `${userName}`,
        //   password: `${userPassword}`,
        // },
        config,
      })
      .then();
    setData(products);
  }, []);

  console.log(data);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
