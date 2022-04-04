import React, { useState, useEffect } from "react";

// import "../../styles/components/Sildeshow/Sildeshow.scss";
// import the scss file
// import "./../client/src/styles/components/Slider/Slideshow.scss";

// import scss file
// import "./../client/src/styles/components/Slider/Slideshow.scss";

import Title from "../products/Title";
import Seat from "../products/carousel/Seat";
import Card from "./Card";
import { useUser } from "./../../contexts/useUser";

import { motion } from "framer-motion";

import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

// import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Slideshow = ({ items }) => {
  const { user, dispatch } = useUser();

  const [data, setData] = useState(items);

  const [currentSlide, setCurrentSlide] = useState(data[0]);

  const [nextSlide, setNextSlide] = useState(data[1]);

  const [prevSlide, setPrevSlide] = useState(data[data.length - 1]);

  //find the index of the current slide

  const [currentIndex, setCurrentIndex] = useState(0);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setData(user.details.user.favorites);
  }, [user.details.user.favorites]);

  console.log("data", data);

  console.log(currentIndex);

  useEffect(() => {
    setCurrentSlide(data[currentIndex]);
  }, [currentIndex]);

  // render(){

  const currentOrgin = "favorite";

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
          stroke="#4d90a8"
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
          stroke="#4d90a8"
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
          <div className={`cards-slider active-slide-${currentIndex - 1}`}>
            {
              // check the size of the window and if it is less than 600px, then render the cards in a row
              width < 420 ? (
                // phone devices
                <div
                  className="cards-slider-wrapper"
                  style={{
                    transform: `translateX(
                  -${
                    currentIndex * 100 // desktop
                  }vw)`,
                    // transform slide width
                    transition: "transform .8s cubic-bezier(1, -0.65, 0, 1.7)",

                    gap: "0",

                    // transform: `translateX(
                    //   calc(-60vw - ${currentIndex} * -50vw)))
                    //   )`,

                    padding: "0",

                    display: "flex",
                    "align-items": "center",
                    flexDirection: "row",
                    flexWrap: "nowrap",
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
                      style={{
                        // width: "100vw",
                        height: "10rem",
                        // width: "100vw !important",
                        minWidth: "100vw !important",
                      }}
                      {...property}
                      image={property.imageArray[0]}
                      order={index}
                      key={Math.random()}
                      orgin="favorites"
                    />
                  ))}
                </div>
              ) : (
                // desktop devices
                <div
                  className="cards-slider-wrapper"
                  style={{
                    transform: `translateX(
                  -${
                    currentIndex * 35 //phone
                  }vw)`,
                    // transform slide width
                    transition: "transform .8s cubic-bezier(1, -0.65, 0, 1.7)",

                    gap: "5rem",

                    padding: "0 0 0 20rem",

                    display: "flex",
                    "align-items": "center",
                    flexDirection: "row",
                    flexWrap: "nowrap",
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
                      style={{
                        width: "80vw",
                        height: "10rem",
                        // width: "100vw !important",
                        minWidth: "100vw !important",
                      }}
                      {...property}
                      image={property.imageArray[0]}
                      order={index}
                      key={Math.random()}
                      orgin="favorites"
                    />
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Slideshow;
