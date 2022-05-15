import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { CategoriasView, ProdutosView } from "./views";

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
          <Route
            path="/produtos"
            element={<ProdutosView/>}
          />
        </Route>
      </Routes>
    </Router>
  );
}



export default App;
