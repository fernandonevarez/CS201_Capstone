import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/useUser";

const Dropdown = ({ id, name, links }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useUser();

  const [linkURL, setLinkURL] = useState();

  /*
  need to work on:
  need to mkae it so that if there is a :userID in the link, it gets replace with the user's id
  */
  

  // console.log("links", links);
  return (
    <button className="footer-section" key={id}>
      <div
        className="footer-section-title"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {name}
      </div>
      {showDropdown ? (
        <div className="footer-section-links show" key={id}>
          {links.map((item) => {
            const { id, name, link, opatialRequirement } = item;

            // setLinkURL(link);

            // check if the string linkURL contains the userID
            // if it does, replace the userID with the userID from the user object

            if (opatialRequirement != null) {
              return (
                <>
                  {opatialRequirement ? (
                    <Link key={id} to={linkURL}>
                      {name}
                    </Link>
                  ) : null}
                </>
              );
            } else {
              return (
                <>
                  <Link key={id} to={link}>
                    {name}
                  </Link>
                </>
              );
            }

            // if (item.opatialRequirement) {
            //   item.opatialRequirement.forEach((requirement) => {
            //     requirementString.concat(`${requirement} && `);
            //   });
            //   // opatialRequirement.map((requirement) => {

            //   //   // if (
            //   //   //   opatialRequirement.indexOf(requirement) !==
            //   //   //   opatialRequirement.length - 1
            //   //   // ) {
            //   //   //   requirementString += requirement + " && "
            //   //   // } else {
            //   //   //   requirementString += requirement

            //   //   // }

            //   //   // check if the requirement is the last one in the array or not
            //   //   if (opatialRequirement.indexOf(requirement) !== opatialRequirement.length - 1) {
            //   //     // add the requirement to the requirementString
            //   //     requirementString += requirement + " && ";
            //   //   } else {
            //   //     requirementString += requirement;
            //   //   }
            //   // }

            //   // );

            //   // console.log("index", opatialRequirement.indexOf(requirement));

            // }

            // if (link.indexOf(":userID") > -1) {
            //   if (user.details.isAuthenticated == true) {
            //     // link = link.replace(":userID", user.details.user._id);
            //     setLinkURL(link.replace(":userID", user.details.user._id));
            //   }
            // } else {
            //   setLinkURL(link);
            // }

            // console.log("linkURL", linkURL);

            // return (
            //   <>
            //   {requirementString ? (<Link key={id} to={linkURL}>
            //     {name}
            //   </Link>) : (<Link key={id} to={linkURL}>
            //     {name}
            //   </Link>)}

            //   </>
            // );
          })}
        </div>
      ) : (
        <div className="footer-section-links hide"></div>
      )}
    </button>
  );
};

export default Dropdown;
