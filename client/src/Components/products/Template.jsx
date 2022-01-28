import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import Price from "./Price";


const Template = ({ name, image, favorited, price }) => {
    const {dispatch} = useUser();

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
                    onClick={() => dispatch({type: "favoriteToggle", payload: {name, image, favorited, price}})}
                >
                    {favorited ? <FaHeart /> : <FaRegHeart />}
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