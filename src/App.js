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

function ViewWrapper() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Categorias</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  )
}

function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  const [action, setAction] = useState({
    name: "",
    status: "idle",
    index: null
  });
  
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
