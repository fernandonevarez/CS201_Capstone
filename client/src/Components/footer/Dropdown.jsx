import React from "react";

import "../../styles/components/footer/Dropdown.scss";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import useCollapse from "react-collapsed";

const Dropdown = ({ title, content }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="collapsible">
      {isExpanded ? (
        <div className="header expaned-header" {...getToggleProps()}>
          <h3 >{title}</h3> <IoIosArrowUp />
        </div>
      ) : (
        <div className="header" {...getToggleProps()}>
          <h3>{title}</h3> <IoIosArrowDown />
        </div>
      )}

      <div className="collapsed-panel" {...getCollapseProps()}>
        <div className="content">{content}</div>
      </div>
    </div>
  );
};

export default Dropdown;
