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

function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  const [action, setAction] = useState({
    name: "",
    status: "idle",
    index: null
  });

  const addRef = useRef();
  const editRef = useRef();
  
  useEffect(() => {
    CategoriasAPI.getAll()
      .then(res => setCategorias(res))
      .catch(err => console.error(err));
  }, []);

  const validate = input => {
    if (input.value.length === 0) {
      input.focus();
      alert("Campo nome categoria não pode ficar em branco!");
      return;
    }
    return true;
  }

  const handleAction = ({name, status, index}) => {
    setAction({
      name: name || "",
      status: status || "idle",
      index: index || null
    });
  }

  const handleAdd = () => {
    const input = addRef.current;
    if (!validate(input))
      return;

    CategoriasAPI.add({nm_categoria: input.value})
      .then(res => {
        setCategorias([...categorias, res[0]]);
        input.value = "";
      })
      .catch(err => console.error(err));
  }

  const handleEdit = () => {
    const input = editRef.current;
    if (!validate(input))
      return;

    categorias.map((c, i) => {
      if (i === action.index)
        c.nm_categoria = input.value;
      
      return c;
    });

    const categoria = categorias.filter((c,i) => i === action.index)[0];

    CategoriasAPI.edit(categoria)
      .then(res => {
        setCategorias([...categorias]);
        input.value = "";
      })
      .catch(err => console.error(err));
  }

  return (
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

      {action.name !== "" && action.name === "edit" && (
        <div>
          <div>
            <h5>Editar categoria</h5>
            <button type="button" onClick={() => handleAction({name: "", index: null})}>
              <VscClose/>
            </button>
          </div>
          <div>
            <input ref={editRef} />
          </div>
          <div>
            <button type="button" onClick={() => handleAction({name: "", index: null})}>
              Fechar
            </button>
            <button type="button" onClick={() => handleEdit()}>
              Salvar
            </button>
          </div>
        </div>
      )}

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
      )}
    </div>
  )
}

export default App;
