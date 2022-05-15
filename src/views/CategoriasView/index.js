import React, { useEffect, useRef, useState } from "react";
import { VscTrash, VscEdit, VscAdd } from "react-icons/vsc";

import { Modal } from "../../components";

import { CategoriasAPI } from "../../api";

function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  const [action, setAction] = useState({
    name: "",
    status: "idle",
    index: null
  });
  const [confirm, setConfirm] = useState({
    open: false,
    title: "Atenção",
    question: "Tem certeza?",
    onDisagree: undefined,
    onAgree: undefined
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
      index
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
        handleAction();
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
        handleAction();
      })
      .catch(err => console.error(err));
  }

  const handleDelete = (index) => {
    const categoria = categorias.filter((c, i) => i === index)[0];
    const _categorias = categorias.filter((c, i) => i !== index);
    
    CategoriasAPI.delete(categoria.id_categoria)
      .then(res => {
        setCategorias(_categorias);
        handleCloseConfirm();
      })
      .catch(err => console.error(err));
  }

  const handleOpenConfirm = (index) => {
    setConfirm(prevState => ({
      ...prevState,
      open: true,
      question: "Tem certeza que quer remover essa categoria?",
      onAgree: () => {
        handleDelete(index);
      },
      onDisagree: () => {
        handleCloseConfirm();
      }
    }));
  }
  const handleCloseConfirm = () => {
    setConfirm(prevState => ({
      ...prevState,
      open: false,
      onAgree: undefined
    }));
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
              <li key={index}>
                <div>
                  <span>{categoria.nm_categoria}</span>
                  <span>
                    <button type="button" onClick={() => handleAction({name: "edit", index})}>
                      <VscEdit/>
                    </button>
                  </span>
                  <span>
                    <button type="button" onClick={() => handleOpenConfirm(index)} style={{backgroundColor: "red"}}>
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
        <Modal
          open={action.name !== "" && action.name === "edit"}
          title="Editar categoria"
          content={<input ref={editRef} placeholder={categorias.filter((c, i) => i === action.index)[0].nm_categoria} />}
          onAgree={() => handleEdit()}
          onDisagree={() => handleAction({name: "", index: null})}
          onClose={() => handleAction({name: "", index: null})}
        />
      )}

      {action.name !== "" && action.name === "add" && (
        <Modal
          open={action.name !== "" && action.name === "add"}
          title="Cadastrar categoria"
          content={<input ref={addRef}/>}
          onAgree={() => handleAdd()}
          onDisagree={() => handleAction({name: "", index: null})}
          onClose={() => handleAction({name: "", index: null})}
        />
      )}

      <Modal
        open={confirm.open}
        title={confirm.title}
        content={confirm.question}
        onAgree={confirm.onAgree}
        onDisagree={confirm.onDisagree}
      />
    </div>
  )
}

export default CategoriasView;