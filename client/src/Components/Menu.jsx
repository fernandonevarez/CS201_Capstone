import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import { log } from "npmlog";

/*

every product needs to have a target and name
*/

const SAMPLE_DATA_REMOVE_LATER = [
  {
    name: "Popular",
    children: [],
  },
  {
    name: "New",
    children: [],
  },
  {
    name: "Toys",
    children: [
      {
        name: "Action Figures",
        children: [
          {
            name: "GI Joe",
            children: [],
          },
          {
            name: "Batman",
            children: [],
          },
          {
            name: "Spiderman",
            children: [],
          },
          {
            name: "Villain",
            children: [
              {
                name: "Doctor Octopus",
                children: [],
              },
              {
                name: "Joker",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "Dolls",
        children: [
          {
            name: "Old",
            children: [],
          },
          {
            name: "Baby",
            children: [],
          },
        ],
      },
      {
        name: "Baby",
        children: [
          {
            name: "Supplies",
            children: [
              {
                name: "Bibs",
                children: [],
              },
              {
                name: "Holders",
                children: [],
              },
              {
                name: "Blankets",
                children: [],
              },
            ],
          },
          {
            name: "Toys",
            children: [
              {
                name: "Pushies",
                children: [],
              },
            ],
          },
          {
            name: "Food",
            children: [],
          },
        ],
      },
      {
        name: "Outdoors",
        children: [
          {
            name: "Playground",
            children: [
              {
                name: "Bucket",
                children: [],
              },
              {
                name: "Playset",
                children: [],
              },
              {
                name: "Sandbox",
                children: [],
              },
              {
                name: "Slide",
                children: [],
              },
            ],
          },
          {
            name: "Camping",
            children: [
              {
                name: "Bubbles",
                children: [],
              },
            ],
          },
          {
            name: "Beach",
            children: [
              {
                name: "Sand Molds",
                children: [],
              },
              {
                name: "Shovels",
                children: [],
              },
              {
                name: "Water Guns",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Art",
    children: [
      {
        name: "Modern",
        children: [],
      },
      {
        name: "Rustic",
        children: [],
      },
      {
        name: "Stickers",
        children: [
          {
            name: "Fun",
            children: [],
          },
          {
            name: "Sayings",
            children: [],
          },
        ],
      },
      {
        name: "Wall",
        children: [
          {
            name: "Paintings",
            children: [],
          },
          {
            name: "Posters",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "Entertainment",
    children: [
      {
        name: "Movies",
        children: [],
      },
      {
        name: "Video Games",
        children: [],
      },
      {
        name: "Outdoors",
        children: [
          {
            name: "Balls",
            children: [
              {
                name: "Football",
                children: [],
              },
              {
                name: "Soccerball",
                children: [],
              },
              {
                name: "Baseball",
                children: [],
              },
            ],
          },
          {
            name: "Games",
            children: [
              {
                name: "Cornhole",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Clothing",
    children: [
      {
        name: "Women",
        children: [],
      },
      {
        name: "Men",
        children: [],
      },
      {
        name: "Girls",
        children: [],
      },
      {
        name: "Boys",
        children: [],
      },
      {
        name: "Unisex",
        children: [],
      },
    ],
  },
  {
    name: "Craft Supplies",
    children: [
      {
        name: "Paints",
        children: [],
      },
      {
        name: "Brushes",
        children: [],
      },
      {
        name: "Paper",
        children: [
          {
            name: "Cardstock",
            children: [],
          },
          {
            name: "Origami",
            children: [],
          },
        ],
      },
      {
        name: "Pencils",
        children: [],
      },
    ],
  },
  {
    name: "Tools",
    children: [
      {
        name: "Power",
        children: [
          {
            name: "Drills",
            children: [],
          },
          {
            name: "Sanders",
            children: [],
          },
        ],
      },
      {
        name: "Woodworking",
        children: [
          {
            name: "Hammers",
            children: [],
          },
          {
            name: "Sandpaper",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "Party Items",
    children: [
      {
        name: "Birthday",
        children: [
          {
            name: "Balloons",
            children: [],
          },
          {
            name: "Party Hats",
            children: [],
          },
          {
            name: "Goodie Bags",
            children: [],
          },
          {
            name: "Kazoos",
            children: [],
          },
        ],
      },
      {
        name: "Wedding",
        children: [
          {
            name: "Flowers",
            children: [],
          },
          {
            name: "Chairs",
            children: [],
          },
        ],
      },
      {
        name: "New Years",
        children: [
          {
            name: "Cider",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "Jewelry",
    children: [
      {
        name: "Rings",
        children: [],
      },
      {
        name: "Necklases",
        children: [],
      },
      {
        name: "Bracelets",
        children: [],
      },
      {
        name: "Anklets",
        children: [],
      },
      {
        name: "Earings",
        children: [],
      },
    ],
  },
  {
    name: "Accessories",
    children: [
      {
        name: "Hats",
        children: [],
      },
      {
        name: "Shoes",
        children: [],
      },
    ],
  },
];

const Menu = ({ toggleMenu }) => {
  const [catagories, setCatagories] = useState(SAMPLE_DATA_REMOVE_LATER);
  const [display, setDisplay] = useState(SAMPLE_DATA_REMOVE_LATER);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const exit = () => {
    // setDisplay(SAMPLE_DATA_REMOVE_LATER)
    // setHistory([])
    toggleMenu();
  };

  const back = () => {
    // pops the last vlaue
    setDisplay(history[history.length - 1]);
    setHistory((h) => h.slice(0, h.length - 1));
    // set the display to the prevoious display value
  };

  const contuine = async (next, name) => {
    setHistory((h) => [...h, display]);
    setDisplay(next);
    navigate(`/products/catagories/${name}`);
  };

  // --------------------------------------------- //
  // Use the following later to get sub catagories //
  // Does not work currently becuase there is no   //
  // such thing as a sub catagory in the model     //
  // --------------------------------------------- //

  // useEffect(() => {
  //   setCatagories(c => c.map(async (cata) => {
  //     const {data, error} = await axios.get(`http://localhost:3000/api/v1/products/catagories/${cata.ref}`);
  //     console.log(data, error)
  //     if (error) {
  //       // console.log(error);
  //       return cata;
  //     }
  //     // setCatagories(c => c.map(cata => cata.name === name ? {...cata, children: data.products} : cata));
  //     return {...cata, children: data.products}
  //   }))
  // }, []);

  return (
    <>
      <div className="hide" onClick={exit}></div>

      <div className="content">
        <div className="top">
          <div className="back">
            {history.length ? <FaChevronLeft onClick={back} /> : null}
          </div>
          <h2>Browse Departments</h2>
          <div className="exit">
            <FaTimes onClick={exit} />
          </div>
        </div>
        <ul className="navigate">
          {display.map(({ name, children }, index) => (
            <li key={index}>
              <>
                {children.length ? (
                  // has children
                  <div
                    className="catagory"
                    onClick={() => contuine(children, name)}
                  >
                    <Link to={`/products/catagories/${name}`}>
                      <h3 className="catagory-name">{name}</h3>
                    </Link>

                    <div className="continue">
                      {children.length ? (
                        <FaChevronRight
                          onClick={() => contuine(children, name)}
                        />
                      ) : null}
                    </div>
                  </div>
                ) : (
                  // doesn't have children
                  <div className="catagory">
                    <Link to={`/products/catagories/${name}`} onClick={exit}>
                      <h3 className="catagory-name">{name}</h3>
                    </Link>
                  </div>
                )}
              </>
            </li>
          ))}
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
