import { useEffect } from "react";
import "../../styles/components/products/Price.scss";

const Price = ({ amount }) => {
  amount =
    +`${amount}`.substring(0, `${amount}`.length - 2) +
    +`${amount}`.substring(`${amount}`.length - 2, `${amount}`.length) / 100;

  return (
    <div className="price-tag" id="product-price">
      <span>$</span>
      {Math.floor(amount)}
      {amount < 100 ? (
        <span>{(amount % 1).toFixed(2).substring(2)}</span>
      ) : (
        <span>{(amount / 100) % 1}</span>
      )}
    </div>
  );
};

export default Price;
