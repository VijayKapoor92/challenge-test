import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { CategoriasView } from "./views";

import { ViewWrapper } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewWrapper />}>
          <Route
            index
            element={<CategoriasView/>}
          />
        </Route>
      </Routes>
    </Router>
  );
}



export default App;
