import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import { log } from "npmlog";

/*

every product needs to have a target and name
*/

const SAMPLE_DATA_REMOVE_LATER = [
  {
    name: "Popular",
    id: 1,
    children: [],
  },
  {
    name: "New",
    id: 2,
    children: [],
  },
  {
    name: "Toys & Entertainment",
    id: 3,

    children: [
      {
        name: "Toys",
        // make an id with the current time in milliseconds
        id: 1,

        children: [
          {
            name: "Action figures.",
            id: 1,
            children: [],
          },
          {
            name: "Animals",
            id: 2,
            children: [],
          },
          {
            name: "Creative toys",
            id: 3,
            children: [],
          },
          {
            name: "Dolls",
            id: 4,
            children: [],
          },
        ],
      },
    ],
  },
];

const Menu = ({ toggleMenu }) => {
  const [display, setDisplay] = useState(SAMPLE_DATA_REMOVE_LATER);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const exit = () => {
    setDisplay(SAMPLE_DATA_REMOVE_LATER)
    setHistory([])
    toggleMenu();
  }

  const back = () => {
    // pops the last vlaue
    setDisplay(history[history.length - 1])
    setHistory(h => h.slice(0, h.length - 1))
    // set the display to the prevoious display value
  }

  const contuine = (next) => {
    setHistory(h => [...h, display]);
    setDisplay(next);
  }

  return (
    <>
      <div className="hide" onClick={exit}></div>
      <div className="content">
        <div className="top">
          <div className="back">
            {history.length ? <FaChevronLeft  onClick={back} /> : null}
          </div>
          <h2>Browse Catagories</h2>
          <div className="exit" >
            <FaTimes onClick={exit} />
          </div>
        </div>
        <ul className="navigate">
          {display.map(({name, id, children}) => <li key={id}>
            <Link to={`/products/catagories/${name}`} onClick={() => {
                if (children.length)
                  contuine(children)
                else 
                  exit();
              }}>
              <h3>{name}</h3>
            </Link>
            <div className="continue">
              {children.length ? <FaChevronRight onClick={() => contuine(children)}/> : null}
            </div>
          </li>)}
        </ul>
      </div>
    </>
  );

// OLD
  // const [catagories, setCatagories] = useState(SAMPLE_DATA_REMOVE_LATER);
  // const [previousCatagories, setPreviousCatagories] = useState([]);
  // const [previousCatagoryArray, setPreviousCatagoryArray] = useState([]);
  // const [menuLevel, setMenuLevel] = useState(0);

  // const previousCatagoryArray = [];

  // make a previousCatetoryArray
  // const previousCatagoryArray = [];

  /*

  to show children i need:

  useState - to show the children
  function to toggle the children

  */

  // const menuLevels = 1;

  // useEffect(() => {
  //   for (let i = 0; i < menuLevels; i++) {
  //     // push the current catagory to the previousCatagoryArray
  //     setPreviousCatagoryArray((previousCatagoryArray) => [
  //       ...previousCatagoryArray,
  //       catagories,
  //     ]);
  //   }
  //   console.log(previousCatagoryArray);
  // }, []);

  // console.log("catagories", catagories);
  // console.log("previousCatagories", previousCatagories);

  // console.log("menuLevel", menuLevel);

  // console.log("previousCatagoryArray", previousCatagoryArray);

  // previousCatagoryArray.push(catagories);

    // <>
    //   {/* <div
    //     className="hide"
    //     onClick={() => {
    //       setCatagories(SAMPLE_DATA_REMOVE_LATER);
    //       toggleMenu();
    //     }}
    //   ></div>
    //   <div className="content">
    //     <div className="top"> */}
    //       {/* {
    //         // if there are no previous catagories, hide the chevron
    //         previousCatagories.length === 0 ? null : (
    //           <FaChevronLeft
    //             onClick={() => {
    //               setCatagories(previousCatagories);

    //               // setMenuLevel(menuLevel - 1);

    //               console.log("go back");
    //               console.log("previous catagory array", previousCatagoryArray);

    //               //  add catagory to previous catagory array

    //               // remove the last item from the previousCatagoryArray
    //               // previousCatagoryArray.pop();

    //               // setCatagories(SAMPLE_DATA_REMOVE_LATER)
    //               // setMenuLevel(0)
    //             }}
    //           />
    //         )
    //       } */}
    //       <h2>Browse Catagories</h2>

    //       <div
    //         className="exit-icon"
    //         onClick={() => {
    //           setCatagories(SAMPLE_DATA_REMOVE_LATER);
    //           toggleMenu();
    //         }}
    //       >
    //         <FaTimes />
    //       </div>
    //     </div>
    //     <ul className="navigate">
    //       {catagories.map((category) => {
    //         // let menuLevel = 0;

    //         if (category.children) {
    //           // console.log("category.children", category.children);
    //           return (
    //             <li key={category.id}>
    //               <div
    //                 className="link"
    //                 onClick={() => {
    //                   setCatagories(category.children);
    //                 }}
    //               >
    //                 <h3>{category.name}</h3>
    //                 {/* {category.hasOwnProperty("name") ? (
    //                   <h3>{category.name}</h3>
    //                 ) : (
    //                   (setHasChildren(!hasChildren),
    //                   (<h3>{category.target}</h3>))
    //                 )} */}
    //                 <div className="continue-icon">
    //                   <FaChevronRight
    //                     onClick={() => {
    //                       setPreviousCatagories(catagories);

    //                       // setPreviousCatagoryArray(...previousCatagoryArray, category.name)
    //                       // push an array to previousCatagoryArray

    //                       // previousCatagoryArray.map((item) => {
    //                       //   if (item != catagories) {
    //                       //     setPreviousCatagoryArray([
    //                       //       ...previousCatagoryArray,
    //                       //       [catagories],
    //                       //     ]);
    //                       //   }
    //                       // });
    //                       // setPreviousCatagoryArray((oldArray) => [
    //                       //   ...oldArray,
    //                       //   [catagories],
    //                       // ]);

    //                       // increase the menu level by 1
    //                       setMenuLevel(menuLevel + 1);
    //                       console.log("menuLevel", menuLevel);

    //                       // check if there are children
    //                     }}
    //                   />
    //                 </div>
    //               </div>
    //             </li>
    //           );
    //         } else {
    //           return (
    //             <li key={category.id}>
    //               {/* <div
    //                 className="link"
    //                 onClick={() => {
    //                   setCatagories(category.children);
    //                 }}
    //               >
    //                 <h3>{category.name}</h3>
    //               </div> */}

    //               <Link to={`/products/catagories/${category.name}`}>
    //                 {category.name}
    //               </Link>
    //             </li>
    //           );
    //         }

            
    //         })}
    //     </ul>
    //   </div>
    // </>
};

export default Menu;
