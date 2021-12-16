import { Switch, Route } from "react-router-dom";
// import { Routes as Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import "./Styles/main.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" element={<Home />} />
      </Switch>
    </div>
  );
}

export default App;
