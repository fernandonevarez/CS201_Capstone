import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FaTimes, FaChevronRight, FaChevronLeft } from "react-icons/fa";

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
            target: "For Kids",
            id: 1,
          },
          {
            target: "For Teens",
            id: 2,
          },
          {
            target: "For Adults",
            id: 3,
          },
          {
            target: "Netural",
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

  const [hasChildren, setHasChildren] = useState(true);

  /*

  to show children i need:

  useState - to show the children
  function to toggle the children

  */
  console.log("catagories", catagories);
  console.log("previousCatagories", previousCatagories);

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
          <FaChevronLeft onClick={() => setCatagories(previousCatagories)} />
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
            return (
              <li key={category.id}>
                {hasChildren ? (
                  <div
                    className="link"
                    onClick={() => {
                      setCatagories(category.children);
                    }}
                  >
                    {category.hasOwnProperty("name") ? (
                      <h3>{category.name}</h3>
                    ) : (
                      (setHasChildren(!hasChildren),
                      (<h3>{category.target}</h3>))
                    )}
                    <div className="continue-icon">
                      <FaChevronRight
                        onClick={() => {
                          setPreviousCatagories(catagories);

                          setCatagories(previousCatagories);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    className="category-link"
                    to={`/products/catagories/${category.target.replace(
                      / /g,
                      ""
                    )}`}
                  >
                    {category.target}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CategoryMenu;
