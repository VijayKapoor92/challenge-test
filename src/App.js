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
  const handleAction = ({name, status, index}) => {
    setAction({
      name: name || "",
      status: status || "idle",
      index: index || null
    });
  }

  const handleAdd = () => {
    const input = addRef.current;
    if (input.value.length === 0) {
      input.focus();
      alert("Campo nome categoria não pode ficar em branco!");
      return;
    }

    CategoriasAPI.add({nm_categoria: input.value})
      .then(res => {
        setCategorias([...categorias, res[0]]);
        input.value = "";
      })
      .catch(err => console.error(err));
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
    <div>
      <div>
        <h4>Categorias</h4>
        <div>
          <button type="button" onClick={() => handleAction({name: "add"})}>
            <VscAdd/>
          </button>
        </div>
      </div>
      <div>
        <ul>
          {categorias.length > 0 && categorias.map((categoria, index) => {
            return (
              <li>
                <div>
                  <span>{categoria.nm_categoria}</span>
                  <span>
                    <button type="button" onClick={() => handleAction({name: "edit", index})}>
                      <VscEdit/>
                    </button>
                  </span>
                  <span>
                    <button type="button" onClick={() => handleAction({name: "delete", index})}>
                      <VscTrash/>
                    </button>
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {action.name !== "" && action.name === "add" && (
        <div>
          <div>
            <h5>Cadastrar categoria</h5>
            <button type="button" onClick={() => handleAction({name: "", index: null})}>
              <VscClose/>
            </button>
          </div>
          <div>
            <input ref={addRef}/>
          </div>
          <div>
            <button type="button" onClick={() => handleAction({name: "", index: null})}>
              Fechar
            </button>
            <button type="button" onClick={() => handleAdd()}>
              Salvar
            </button>
          </div>
        </div>
}

export default App;
