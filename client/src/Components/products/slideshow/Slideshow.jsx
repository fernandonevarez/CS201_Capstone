import {useState, useEffect} from "react"
import {FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart} from "react-icons/fa";
import Price from "../Price";
import "../../../styles/components/home/slideshow/Slideshow.scss"

// Carousel Settings
const SLIDER_SLIDE_RESOLUTION = 10; // Smaller is more resolute
const SLIDER_FORCE = 100;
const SLIDER_TIMEOUT = 250;
const SLIDER_EASING_FUNCTION = num => 1 - ((1 - num) ** 3);

// SLIDESHOW IS STILL BROKEN BECAUSE WHEN SLIDEING DOESN"T GO TO NEAREST PANNEL :(
// FIX LATER, HAVE MORE PRESSING THIGNS TO ATTEND TO

const Slideshow = ({items}) => {
    const [scroll, setScroll] = useState(0);
    const [slider, setSlider] = useState({start: null, end: null, move: null})
    const [display, setDisplay] = useState(items)
    const [screenWidth, setScreenWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null)
    const [timeoutID, setTimeoutID] = useState(null)

    const [next, setNext] = useState(null);


    useEffect(() => {
        setScreenWidth(window.innerWidth)
        const resize = () =>
            setScreenWidth(window.innerWidth)

        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    const start = e => {
        intervalID && clearInterval(intervalID);
        timeoutID && clearTimeout(timeoutID);
        setSlider(s => ({...s, start: e.changedTouches[0].clientX}))
    }

    const end = e => {
        // This entire function is hard to understand, if I have time I should chunk it up into smaller parts
        // make it more readable and such

        setSlider(s => ({...s, end: e.changedTouches[0].clientX}))

        const dist = ((slider.move || e.changedTouches[0].clientX) - e.changedTouches[0].clientX) * SLIDER_FORCE;
        const origin = scroll;

        let t = 0;
        const id = setInterval(() => {
            if (t >= 1) {
                const toid = setTimeout(() => {
                    let tt = 0;
                    const dd = (origin - dist) % screenWidth
                    // console.log(dd)
                    const oo = (origin - dist);
                    const idid = setInterval(() => {
                        if (tt >= 1) {
                            clearInterval(idid)
                        }

                        setScroll(dd > screenWidth / 2 ? oo + (screenWidth - dd) * SLIDER_EASING_FUNCTION(tt) : oo - dd * SLIDER_EASING_FUNCTION(tt))

                        tt += 1 / SLIDER_SLIDE_RESOLUTION;
                    }, SLIDER_SLIDE_RESOLUTION)
                    setIntervalID(idid)
                }, SLIDER_TIMEOUT);
                setTimeoutID(toid)
                clearInterval(id)
            }
            t += 1 / SLIDER_SLIDE_RESOLUTION;
            setScroll(origin - dist * SLIDER_EASING_FUNCTION(t))
        }, SLIDER_SLIDE_RESOLUTION)
        setIntervalID(id);

        setSlider(s => ({...s, move: 0}))
    }

    const move = e => {
        slider.move && setScroll(s => s + e.changedTouches[0].clientX - slider.move)
        setSlider(s => ({...s, move: e.changedTouches[0].clientX}))
    }

    useEffect(() => {
        const offscreen = Math.floor(scroll / screenWidth)
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
            className="main-slideshow"
            onTouchStart={start}
            onTouchEnd={end}
            onTouchMove={move}
        >
            <div className="display">
                {display.map((item, index) => <div className="sect" key={index} style={{transform: `translateX(calc(-100vw + ${scroll - screenWidth * next}px))`}}>
                    <div className="atop">
                        <img src={item.image} alt={item.name} />
                        <div className="top">
                            <Price amount={item.price} />
                            <div className="favorited">
                                {item.favorited ? <FaHeart /> : <FaRegHeart />}
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <h2>{item.name}</h2>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default Slideshow
