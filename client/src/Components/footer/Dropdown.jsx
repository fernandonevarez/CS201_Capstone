import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useUser } from "../../contexts/useUser";

import "../../styles/components/footer/Dropdown.scss";

import useCollapse from "react-collapsed";

const Dropdown = () => {
  // const [showDropdown, setShowDropdown] = useState(false);

  // const { user } = useUser();

  // const [linkURL, setLinkURL] = useState();

  /*
  need to work on:
  need to mkae it so that if there is a :userID in the link, it gets replace with the user's id
  */



  // console.log("links", links);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  // isExpanded = true;

  // console.log("getToggleProps", getToggleProps());

  // decunstruct the getToggleProps


  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? "Collapse" : "Expand"}
      </div>
      <div className="collapsed-panel" {...getCollapseProps()}>
        <div className="content">
          Now you can see the hidden content. <br />
          <br />
          Click again to hide...
        </div>
      </div>
    </div>

    // <button className="footer-section" key={id}>
    //   <div
    //     className="footer-section-title"
    //     onClick={() => setShowDropdown(!showDropdown)}
    //   >
    //     {name}
    //   </div>
    //   {showDropdown ? (
    //     <div className="footer-section-links show" key={id}>
    //       {links.map((item) => {
    //         const { id, name, link, opatialRequirement } = item;

    //         // setLinkURL(link);

    //         // check if the string linkURL contains the userID
    //         // if it does, replace the userID with the userID from the user object

    //         if (opatialRequirement != null) {
    //           // loop through the opatialRequirement array
    //           // if the opatialRequirement array contains "userAuth" or "userStore" then retun

    //           let requirement = "";

    //           const userAuth = "user.details.isAuthenticated";
    //           const userStore = "user.details.user.hasStore";

    //           // loop through the opatialRequirement array
    //           opatialRequirement.forEach((item) => {
    //             // console.log("item", item);
    //             if (item == "userAuth") {
    //               requirement += userAuth;
    //             } else if (item == "userStore") {
    //               requirement += userStore;
    //             }
    //             if (
    //               opatialRequirement.indexOf(item) !=
    //               opatialRequirement.length - 1
    //             ) {
    //               requirement += " && ";
    //             }
    //           });

    //           // Function result = Function(requirement) {
    //           //   return requirement;
    //           // }; // which is same as "return 2+4"
    //           // console.log(result);

    //           // console.log("requirement", F);
    //           // return (F)

    //           // console.log("pass", eval(requirement));

    //           // if the user passes the requirement, then return the link
    //           // if (requirement != "") {
    //           //   let newLink = link.replace(":userID", user.details.user._id);
    //           //   console.log("newLink", newLink);
    //           //   return (
    //           //     <>
    //           //       {requirement ? (
    //           //         <Link
    //           //           key={id}
    //           //           to={newLink}
    //           //           // onClick={() => setShowDropdown(false)}
    //           //         >
    //           //           {name}
    //           //         </Link>
    //           //       ) : null}
    //           //     </>
    //           //   );
    //           // }
    //         } else {
    //           return (
    //             <>
    //               <Link key={id} to={link}>
    //                 {name}
    //               </Link>
    //             </>
    //           );
    //         }

    //         // if (item.opatialRequirement) {
    //         //   item.opatialRequirement.forEach((requirement) => {
    //         //     requirementString.concat(`${requirement} && `);
    //         //   });
    //         //   // opatialRequirement.map((requirement) => {

    //         //   //   // if (
    //         //   //   //   opatialRequirement.indexOf(requirement) !==
    //         //   //   //   opatialRequirement.length - 1
    //         //   //   // ) {
    //         //   //   //   requirementString += requirement + " && "
    //         //   //   // } else {
    //         //   //   //   requirementString += requirement

    //         //   //   // }

    //         //   //   // check if the requirement is the last one in the array or not
    //         //   //   if (opatialRequirement.indexOf(requirement) !== opatialRequirement.length - 1) {
    //         //   //     // add the requirement to the requirementString
    //         //   //     requirementString += requirement + " && ";
    //         //   //   } else {
    //         //   //     requirementString += requirement;
    //         //   //   }
    //         //   // }

    //         //   // );

    //         //   // console.log("index", opatialRequirement.indexOf(requirement));

    //         // }

    //         // if (link.indexOf(":userID") > -1) {
    //         //   if (user.details.isAuthenticated == true) {
    //         //     // link = link.replace(":userID", user.details.user._id);
    //         //     setLinkURL(link.replace(":userID", user.details.user._id));
    //         //   }
    //         // } else {
    //         //   setLinkURL(link);
    //         // }

    //         // console.log("linkURL", linkURL);

    //         // return (
    //         //   <>
    //         //   {requirementString ? (<Link key={id} to={linkURL}>
    //         //     {name}
    //         //   </Link>) : (<Link key={id} to={linkURL}>
    //         //     {name}
    //         //   </Link>)}

    //         //   </>
    //         // );
    //       })}
    //     </div>
    //   ) : (
    //     <div className="footer-section-links hide"></div>
    //   )}
    // </button>
  );
};

export default Dropdown;
