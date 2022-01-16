import {FaHeart, FaRegHeart} from "react-icons/fa"
import Price from "../Price"
import "../../../styles/components/home/carousel/Seat.scss"

const Seat = ({name, image, favorited, price}) => {
    return (
        <div className="carousel-seat">
            <div className="atop">
                <div className="image">
                    <img src={image} alt={name} />
                </div>
                <div className="top">
                    <Price amount={price} />
                    <div className="favorited">
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

export default Seat;
