import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import Price from "./Price";
import "../../styles/components/products/Template.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const Template = ({ name, image, price, classAddition, id: productID }) => {
  const { user, dispatch } = useUser();

//   useEffect(() => {
//     //   gets the user's id
//     const { _id: userID } = user.details.user;
//   }, [user.details.user]); // updates every time user changes



  const addToFavorites = async (userID, productID) => {
    console.log("added to favorites");

    const response = await axios.post()

  }

  const removeFromFavorites = async (userID, productID) => {
      console.log("removed from favorites");
  }

  return (
    <div className={`product-${classAddition}`}>
      <div className="atop">
        <Link to={`/products/${name}`}>
          <div className="image">
            <img src={image} alt={name} />
          </div>
        </Link>
        <div className="top">
          <Price amount={price} />
          <div
            className="favorited"
            onClick={() =>
              dispatch({
                type: "favoriteToggle",
                payload: { name, image, price },
              })
            }
          >
            {user.products.favorites.find((fav) => fav.name === name) ? (
              <FaHeart onClick={() => removeFromFavorites(user.details.user._id, productID)} />
            ) : (
              <FaRegHeart onClick={() => addToFavorites(user.details.user._id, productID)} />
            )}
          </div>
        </div>
      </div>
      <div className="main">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Template;
