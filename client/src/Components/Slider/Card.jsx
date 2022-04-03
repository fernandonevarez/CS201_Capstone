import React from "react";
import PropTypes from "prop-types";
// import "../../styles/components/Slideshow/Slideshow.scss";

const Card = ({ property }) => {
  const {
    _id: productID,
    name,
    price,
    type,
    target,
    description,
    imageArray,
    createdBy,
    createdAt,
    likes,
  } = property;
  return (
    <div id={`card-${productID}`} className="card">
      {/* <img src={imageArray[0]} alt={name} /> */}
      <div className="details">
        <span className="index">{name}</span>
        {/* <p className="location">
          {city}
          <br />
          {address}
        </p>
        <ul className="features">
          <li className="icon-bed">
            {bedrooms} <span>bedrooms</span>
          </li>
          <li className="icon-bath">
            {bathrooms} <span>bathrooms</span>
          </li>
          <li className="icon-car">
            {carSpaces} <span>parking spots</span>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

Card.propTypes = {
  property: PropTypes.object.isRequired,
};

export default Card;
