import {Routes, Route} from "react-router-dom";
import "./styles/globals.scss";

import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SingleProduct from "./Pages/SingleProduct";
import NewProducts from "./Pages/NewProducts";
import Error from "./Pages/Error";
import Popular from "./Pages/Popular";
import Toys from "./Pages/Toys";
import TermsOfUse from "./Pages/Docs/TermsOfUse";
import PrivacyPolicy from "./Pages/Docs/PrivacyPolicy";
import Navbar from "./Components/Navbar";
import Footer from "./Components/footer/Footer";
import Profile from "./Pages/Profile";
import Protected from "./Components/Protected";
import UserStore from "./Pages/UserStore";
import Store from "./Pages/Store";

// import Footer from "./Components/Footer";
// import SingleNew from "./Pages/SingleNew";

function App() {
  return (
    <div className="App">
      <Navbar />


      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={<Cart />}
        // element={<Protected>
        //   <Cart />
        // </Protected>}
        />
        <Route path="/:userID/store" element={<Protected>
          <Store />
        </Protected>} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/catagories/new" element={<NewProducts />} />
        <Route path="/products/catagories/popular" element={<Popular />} />
        <Route path="/products/catagories/Toys" element={<Toys />} />
        {/* Doc Pages */}
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Error />} />
      </Routes>


      <Footer />
    </div>
  );
}

export default App;
