import Seat from "./Seat"

const Carousel = ({items}) => {
    return (
        <div className="carousel">
            {items.map((item, index) => <Seat {...item} index={index} />)}
        </div>
    )
}

export default Carousel
