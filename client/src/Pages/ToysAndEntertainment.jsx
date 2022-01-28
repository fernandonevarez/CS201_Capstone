import React, {useState} from 'react';
import Navbar from '../Components/Navbar';

const ToysAndEntertainment = () => {

  const [toggleMenu, setToggleMenu] = useState(true);

  // have toggleMenu be true and have the menu not hidden
  

  return (
    <div className="page-conatiner">
      <Navbar />
      <h1>Toys and Entertainment</h1>
      </div>
  );
};

export default ToysAndEntertainment;
