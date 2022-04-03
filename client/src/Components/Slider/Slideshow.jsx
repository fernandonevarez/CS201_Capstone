import React, { useState, useEffect } from "react";

// import "../../styles/components/Sildeshow/Sildeshow.scss";
// import the scss file
// import "./../client/src/styles/components/Slider/Slideshow.scss";
import Title from "../products/Title";
import Seat from "../products/carousel/Seat";
import Card from "./Card";
import { useUser } from "./../../contexts/useUser";

import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const Slideshow = ({ items }) => {
  const { user, dispatch } = useUser();

  const [data, setData] = useState(items);

  const [currentSlide, setCurrentSlide] = useState(data[0]);

  const [nextSlide, setNextSlide] = useState(data[1]);

  const [prevSlide, setPrevSlide] = useState(data[data.length - 1]);

  //find the index of the current slide

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setData(user.details.user.favorites);
  }, [user.details.user.favorites]);

  console.log("data", data);

  console.log(currentIndex);

  useEffect(() => {
    setCurrentSlide(data[currentIndex]);
  }, [currentIndex]);

  // render(){

  return (
    <>
      <button
        onClick={() => {
          setCurrentIndex(currentIndex - 1);
          if (currentIndex - 1 < 0) {
            setCurrentIndex(data.length - 1);
          }
        }}
        // disabled={currentIndex === 0}
        style={{
          position: "absolute",
          top: "19rem",
          zIndex: 1,
          background: "transparent",
        }}
        // key="267554"
      >
        <GrLinkPrevious
          style={{
            fontSize: "25px",
          }}
        />
      </button>
      <button
        // key="98764"
        onClick={() => {
          // update the currentIndex, but dont let it go above the length of the data array
          setCurrentIndex(currentIndex + 1);
          if (currentIndex + 1 > data.length - 1) {
            setCurrentIndex(0);
          }
        }}
        // disabled={currentIndex === data.length}
        style={{
          position: "absolute",
          top: "19rem",
          zIndex: 1,
          right: "0",
          background: "transparent",
        }}
      >
        <GrLinkNext
          style={{
            fontSize: "25px",
          }}
        />
      </button>

      <div className="page">
        <section>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Title name="Favorited" />
        </section>

        <div className="col">
          <div className={`cards-slider active-slide-${currentIndex}`}>
            <div
              className="cards-slider-wrapper"
              style={{
                transform: `translateX(
                  -${
                    currentIndex * (400 / data.length) //(100 / data.length) //260
                  }vw)`,
                // transform: `translateX(
                //   calc(-60vw - ${currentIndex} * -50vw)))
                //   )`,

                display: "flex",
                "align-items": "center",
                "flex-direction": "row",
                "flex-wrap": "nowrap",
              }}
            >
              {data.map((property, index) => (
                // <Card
                //   style={{
                //     width: "10rem",
                //     height: "10rem",
                //   }}
                //   key={Math.random()}
                //   property={property}
                // />
                <Seat
                  {...property}
                  image={property.imageArray[0]}
                  order={index}
                  key={Math.random()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;
