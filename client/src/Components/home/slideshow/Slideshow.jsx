import {useState} from "react"
import {FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart} from "react-icons/fa";
import Price from "../Price";
import "../../../styles/components/home/slideshow/Slideshow.scss"

const Slideshow = ({items}) => {
    const [slide, setSlide] = useState(0);

    const changeSlide = (amt) => {
        if (slide + amt < 0)
            setSlide(items.length - 1)
        else if (slide + amt > items.length - 1)
            setSlide(0)
        else
            setSlide(s => s + amt)
    }

    return (
        <div className="main-slideshow">
            <div className="atop">
                <img src={items[slide].image} alt={items[slide].name} />
                <div className="top">
                    <Price amount={items[slide].price} />
                    <div className="favorited">
                        {items[slide].favorited ? <FaHeart /> : <FaRegHeart />}
                    </div>
                </div>
                <div className="center">
                    <div className="left" onClick={() => changeSlide(-1)}>
                        <FaChevronLeft />
                    </div>
                    <div className="right" onClick={() => changeSlide(1)}>
                        <FaChevronRight />
                    </div>
                </div>
            </div>
            <div className="main">
                <h2>{items[slide].name}</h2>
            </div>
        </div>
    )
}

export default Slideshow
