import Seat from "./Seat"
import "../../../styles/components/products/carousel/Carousel.scss"
import {useEffect, useRef, useState} from "react";


// Carousel Settings
const SLIDER_SLIDE_RESOLUTION = 10; // Smaller is more resolute
const SLIDER_FORCE = 100;
const SLIDER_EASING_FUNCTION = num => 1 - ((1 - num) ** 3);

const Carousel = ({items}) => {
    
    
    const [display, setDisplay] = useState(items);
    const [slider, setSlider] = useState({start: null, end: null, move: null})
    const [scroll, setScroll] = useState(0)
    const [intervalID, setIntervalID] = useState(null)
    const [next, setNext] = useState(null);
    const [cartWidth, setCartWidth] = useState(0);

    useEffect(() => {
      setDisplay(items)
      setScroll(s => s + 1)
    }, [items]);
    
    useEffect(() => {
        setCartWidth(window.innerWidth / 100 * 60)
        const resize = () =>
            setCartWidth(window.innerWidth / 100 * 60)

        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    const start = e => {
        intervalID && clearInterval(intervalID);
        setSlider(s => ({...s, start: e.changedTouches[0].clientX}))
    }

    const end = e => {
        setSlider(s => ({...s, end: e.changedTouches[0].clientX}))

        const dist = ((slider.move || e.changedTouches[0].clientX) - e.changedTouches[0].clientX) * SLIDER_FORCE;
        const origin = scroll;

        let t = 0;
        const id = setInterval(() => {
            if (t >= 1)
                clearInterval(id)
            t += 0.01;
            setScroll(s => origin - dist * SLIDER_EASING_FUNCTION(t))
        }, SLIDER_SLIDE_RESOLUTION)
        setIntervalID(id);

        setSlider(s => ({...s, move: 0}))
    }

    const move = e => {
        slider.move && setScroll(s => s + e.changedTouches[0].clientX - slider.move)
        setSlider(s => ({...s, move: e.changedTouches[0].clientX}))
    }

    useEffect(() => {
        const offscreen = Math.floor(scroll / cartWidth)
        if (offscreen !== next) {
            if (next - offscreen > 0) {
                setDisplay(d => [...d.slice(1, d.length), d[0]])
            } else {
                setDisplay(d => [d[d.length - 1], ...d.slice(0, d.length - 1)])
            }
            setNext(offscreen)
        }
    }, [scroll])

    return (
        <div
            className="carousel"
            onTouchStart={start}
            onTouchEnd={end}
            onTouchMove={move}
        >-
            <div className="sect" style={{transform: `translateX(calc(-60vw + ${scroll - cartWidth * next}px))`}}>
                {display.map((item, index) => <Seat {...item} order={index} key={Math.random()} />)}
            </div>
        </div>
    )
}

export default Carousel;
