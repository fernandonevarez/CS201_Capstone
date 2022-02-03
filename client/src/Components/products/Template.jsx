import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import Price from "./Price";
import "../../styles/components/products/Template.scss"
import { Link } from "react-router-dom";

const Template = ({ name, image, price, classAddition }) => {
    const {user, dispatch} = useUser();

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
                        dispatch({type: "favoriteToggle", payload: {name, image, price}})}
                >
                    {user.products.favorites.find(fav => fav.name === name) ? <FaHeart /> : <FaRegHeart />}
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