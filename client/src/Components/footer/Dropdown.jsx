import React, {useState} from "react";

const Dropdown = ({ name, links }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("links", links);
  return (
    <button
      className="footer-section"
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="footer-section-title">{name}</div>
      {showDropdown ? <div className="footer-section-links">
        {links.map((link) => {
          
  
        })}
      </div> : null}
    </button>
  );
};

export default Dropdown;
