import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import { CategoriasAPI } from "./api";
import { VscTrash, VscEdit, VscAdd, VscClose } from "react-icons/vsc";

function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  
  useEffect(() => {
    CategoriasAPI.getAll()
      .then(res => setCategorias(res))
      .catch(err => console.error(err));
  }, []);

  console.log("CATEGORIAS: ", categorias);

  return (
    <ul>
      {categorias.length > 0 && categorias.map(categoria => {
        return (
          <li>{categoria.nm_categoria}</li>
        )
      })}
    </ul>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          exact path="/categorias" 
          element={<CategoriasView/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
