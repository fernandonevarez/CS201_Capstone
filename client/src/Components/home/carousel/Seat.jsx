import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Price from "../Price";
import "../../../styles/components/home/carousel/Seat.scss";

const Seat = ({ name, image, favorited, price }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  // console.log("favorited", favorited);

  const handleFavorite = () => {
    // e.preventDefault();
    setIsFavorited(!isFavorited);

    console.log("favorite updated", isFavorited);

    console.log("remove from user favorites");
  };

  return (
    <div className="carousel-seat">
      <div className="atop">
        <div className="image">
          <img src={image} alt={name} />
        </div>
        <div className="top">
          <Price amount={price} />
          <div
            className="favorited"
            onClick={() => {
              handleFavorite();
            }}
          >
            {isFavorited ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
      </div>
      <div className="main">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Seat;
