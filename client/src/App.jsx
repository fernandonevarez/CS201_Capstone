import { Routes, Route } from "react-router-dom";
import "./styles/globals.scss";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import NewProducts from "./Pages/NewProducts";
import Error from "./Pages/Error";
import Popular from "./Pages/Popular";
import ToysAndEntertainment from "./Pages/ToysAndEntertainment";
// import SingleNew from "./Pages/SingleNew";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/catagories/new" element={<NewProducts />} />
        <Route path="/products/catagories/popular" element={<Popular />} />
        <Route
          path="/products/catagories/Toys%20&%20Entertainment"
          element={<ToysAndEntertainment />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
