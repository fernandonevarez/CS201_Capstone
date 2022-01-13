import {FaHeart, FaRegHeart} from "react-icons/fa"
import Price from "../Price"

const Seat = ({name, image, favorited, price, index}) => {
    return (
        <div className="carousel-seat">
            <Price amount={price} />
            <div className="favorited">
                {favorited ? <FaHeart /> : <FaRegHeart />}
            </div>
            <div className="main">
                <div className="image">
                    <img src={image} alt={name} />
                </div>
                <h3>{name}</h3>
            </div>
        </div>
    )
}

export default Seat;
