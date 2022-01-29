import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import Price from "./Price";
import "../../styles/components/products/Template.scss"

const Template = ({ name, image, price }) => {
    const {user, dispatch} = useUser();

    return (
        <div className="product">
            <div className="atop">
                <div className="image">
                <img src={image} alt={name} />
                </div>
                <div className="top">
                <Price amount={price} />
                <div
                    className="favorited"
                    onClick={() => dispatch({type: "favoriteToggle", payload: {name, image, price}})}
                >
                    {user.products.favorites.findIndex(fav => fav.name === name) ? <FaHeart /> : <FaRegHeart />}
                </div>
                </div>
            </div>
            <div className="main">
                <h3>{name}</h3>
            </div>
      </div>
    )
}

export default Template;