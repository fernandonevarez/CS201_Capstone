import {Routes, Route} from "react-router-dom";
import "./styles/globals.scss";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import Error from "./Pages/Error";
// import SingleNew from "./Pages/SingleNew";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
