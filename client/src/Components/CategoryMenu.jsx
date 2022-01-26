import React, { useState } from "react";

import { Link } from "react-router-dom";
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
    name: "new",
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
          },
          {
            name: "Animals",
            id: 2,
          },
          {
            name: "Creative toys",
            id: 3,
          },
          {
            name: "Dolls",
            id: 4,
          },
        ],
      },
    ],
  },
];

const CategoryMenu = ({ toggleMenu }) => {
  const [catagories, setCatagories] = useState(SAMPLE_DATA_REMOVE_LATER);
  const [previousCatagories, setPreviousCatagories] = useState([]);


  // const [previousCatagoryArray, setPreviousCatagoryArray] = useState([]);
  const previousCatagoryArray = [];

  // make a previousCatetoryArray
  // const previousCatagoryArray = [];

  const [menuLevel, setMenuLevel] = useState(0);

  /*

  to show children i need:

  useState - to show the children
  function to toggle the children

  */


  



  console.log("catagories", catagories);
  console.log("previousCatagories", previousCatagories);

console.log("menuLevel", menuLevel);

console.log("previousCatagoryArray", previousCatagoryArray);

previousCatagoryArray.push(catagories)

  return (
    <>
      <div
        className="hide"
        onClick={() => {
          setCatagories(SAMPLE_DATA_REMOVE_LATER);
          toggleMenu();
        }}
      ></div>
      <div className="content">
        <div className="top">
          {
            // if there are no previous catagories, hide the chevron
            previousCatagories.length === 0 ? (
              null
            ) : (<FaChevronLeft onClick={() => {


              setCatagories(previousCatagories);

              setMenuLevel(menuLevel - 1);

              // remove the last item from the previousCatagoryArray
              previousCatagoryArray.pop();

              // setCatagories(SAMPLE_DATA_REMOVE_LATER)
// setMenuLevel(0)
              
              for(let i = 0; i < menuLevel; i++) {
                setPreviousCatagories(previousCatagoryArray[i])
                // setMenuLevel(menuLevel + 1)
                console.log("new previousCatagories", previousCatagories);
                console.log("previous Catagories level", previousCatagories);
              }

            }} />)
          }
          <h2>Browse Catagories</h2>


          
          <div
            className="exit-icon"
            onClick={() => {
              setCatagories(SAMPLE_DATA_REMOVE_LATER);
              toggleMenu();
            }}
          >
            <FaTimes />
          </div>
        </div>
        <ul className="navigate">
          {catagories.map((category) => {

            // let menuLevel = 0;


            if (category.children) {
                            // console.log("category.children", category.children);
                            return <li key={category.id}>
                
                  <div
                    className="link"
                    onClick={() => {
                      setCatagories(category.children);
                    }}
                  >
                    <h3>{category.name}</h3>
                    {/* {category.hasOwnProperty("name") ? (
                      <h3>{category.name}</h3>
                    ) : (
                      (setHasChildren(!hasChildren),
                      (<h3>{category.target}</h3>))
                    )} */}
                    <div className="continue-icon">
                      <FaChevronRight 
                        onClick={() => {
                          setPreviousCatagories(catagories)

                          

                          // setPreviousCatagoryArray(...previousCatagoryArray, category.name)
                          // push an array to previousCatagoryArray
                          // setPreviousCatagoryArray(oldArray => [...oldArray, [catagories]])
                          

                          // increase the menu level by 1
                          setMenuLevel(menuLevel + 1)
                          console.log("menuLevel", menuLevel);

                          // check if there are children
                          
                        }}
                      />
                    </div>
                  </div>
               
              </li>
            }else{
              return <li key={category.id}>
                
                  {/* <div
                    className="link"
                    onClick={() => {
                      setCatagories(category.children);
                    }}
                  >
                    <h3>{category.name}</h3>
                  </div> */}

                  <Link to={`/products/catagories/${category.name}`}>{category.name}</Link>
            
            </li>}


          //   return (
          //     <li key={category.id}>
                
          //         <div
          //           className="link"
          //           onClick={() => {
          //             setCatagories(category.children);
          //           }}
          //         >
          //           <h3>{category.name}</h3>
          //           {/* {category.hasOwnProperty("name") ? (
          //             <h3>{category.name}</h3>
          //           ) : (
          //             (setHasChildren(!hasChildren),
          //             (<h3>{category.target}</h3>))
          //           )} */}
          //           <div className="continue-icon">
          //             <FaChevronRight 
          //               onClick={() => {
          //                 setPreviousCatagories(catagories)

          //                 // check if there are children
                          
          //               }}
          //             />
          //           </div>
          //         </div>
               
          //     </li>
          //   );
          })}
        </ul>
      </div>
    </>
  );
};

export default CategoryMenu;
