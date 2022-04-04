import React from "react";

import "../styles/components/PageButtons.scss";

import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const PageButtons = ({ pageNumber, setPageNumber, display, products }) => {
  return (
    <div className="action-wrapper">
      {pageNumber == 0 ? (
        <GrFormPreviousLink
          className="page-button disabled"
          // disabled={!this.state.value}
          // onClick={() => {
          //   setPageNumber((p) => p - 1);
          // }}
        />
      ) : (
        <GrFormPreviousLink
          className="page-button"
          onClick={() => {
            setPageNumber((p) => p - 1);
          }}
        />
      )}
      {/* {pageNumber >= 0 && pageNumber != Math.round(products.length / 6) ? (
          <div className="page-number">{pageNumber + 1}</div>
        ) : null} */}

      {display.length < 6 || Number.isInteger(products.length / 6) ? (
        <GrFormNextLink
          className="page-button disabled"

          // disabled={!this.state.value}
          // onClick={() => {
          //   setPageNumber((p) => p + 1);
          // }}
        />
      ) : (
        <GrFormNextLink
          className="page-button"
          onClick={() => {
            setPageNumber((p) => p + 1);
          }}
        />
      )}
    </div>
  );
};

export default PageButtons;
