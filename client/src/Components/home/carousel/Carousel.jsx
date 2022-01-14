import Seat from "./Seat"
import "../../../styles/components/home/carousel/Carousel.scss"
import { useEffect, useState } from "react";

const Carousel = ({items}) => {
    const [slide, setSlide] = useState(0)
    const [prev, setPrev] = useState(null)
    const [md, setMd] = useState(false)
    const display = items.slice(0, 5);

    const move = (amt) => {
        md && prev && setSlide(s => s + amt.clientX - prev)
        setPrev(amt.clientX)
    }

    return (
        <div 
            className="carousel" 
            style={{
                transform: `translateX(${-(5 * 65) / 2 + 10 + slide}vw)`
            }} 
            onTouchStart={() => setMd(true)} 
            onTouchEnd={() => setMd(false)}
            onTouchMove={e => move(e.changedTouches[0])}
        >
            {display.map((item, index) => <Seat {...item} order={index} />)}   
        </div>
    )
}

export default Carousel
