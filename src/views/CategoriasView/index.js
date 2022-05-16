import React, { useEffect, useRef, useState } from "react";
import { VscTrash, VscEdit, VscAdd } from "react-icons/vsc";

import { Modal } from "../../components";

import { CategoriasAPI, ProdutosAPI } from "../../api";

const setBlob = (data) => {
  return new Blob([ JSON.stringify(data) ], { type: 'application/json' });
}

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 1);
  };

  a.addEventListener('click', clickHandler, false);
  a.click();
}

function retiraAcentos(str) 
{

  let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
  let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
  let novastr = "";
  let troca;
  for (let i = 0; i < str.length; i++) {
    troca = false;
    for (let a = 0; a < com_acento.length; a++) {
      if (str.substr(i,1) == com_acento.substr(a,1)) {
        novastr += sem_acento.substr(a,1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      novastr += str.substr(i,1);
    }
  }
  return novastr;
}

function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  
  const [modalAdd, setModalAdd] = useState({ open: false });

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
  const importRef = useRef();
  
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

  const handleOpenModalAdd = () => 
    setModalAdd({ open: true });
  
  const handleCloseModalAdd = () =>
    setModalAdd({ open: false });

  const handleAdd = () => {
    const input = addRef.current;
    
    const handleSuccess = payload => {
      setCategorias([...categorias, payload[0]]);
      input.value = "";
      handleCloseModalAdd();
    }

    const handleError = err => {
      console.error(err);
      handleCloseModalAdd();
    }
    
    if (!validate(input))
      return;

    CategoriasAPI.add(input.value)
      .then(handleSuccess)
      .catch(handleError);
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

  const handleChangeFile = e => {
    const file = e.target.files[0];
    if (file.type !== "application/json") {
      alert("O arquivo deve ser em formato json \n Ex.: [{ \"nm_produto\": \"\", \"qt_produto\": \"\", \"vl_produto\": \"\" }]");
      return;
    }
  }

  const handleImport = () => {
    ProdutosAPI.import({file: importRef.current.files[0], id_categoria: 1})
      .then(res => console.log(res))
      .then(err => console.error(err));
  }

  const handleExport = () => {
    ProdutosAPI.export(1)
      .then(res => {
        // Creating a blob object from non-blob 
        // data using the Blob constructor
        const blob = setBlob(res.payload);
        const filename = retiraAcentos(res.payload[0].nm_categoria);
        downloadBlob(blob, filename);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <div>
        <h4>Categorias</h4>
        <div>
          <button type="button" onClick={handleOpenModalAdd}>
            <VscAdd/>
          </button>
          <div>
            <input type="file" ref={importRef} onChange={handleChangeFile} />
            <button type="button" onClick={handleImport}>
              Importar
            </button>
          </div>
          <button type="button" onClick={handleExport}>
            Exportar
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

      <Modal
        open={modalAdd.open}
        title="Cadastrar categoria"
        content={<input ref={addRef}/>}
        onAgree={() => handleAdd()}
        onDisagree={handleCloseModalAdd}
        onClose={handleCloseModalAdd}
      />

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