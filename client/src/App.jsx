import {Routes, Route} from "react-router-dom";
import "./styles/globals.scss"

import Home from "./Pages/Home";
// import SingleNew from "./Pages/SingleNew";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
