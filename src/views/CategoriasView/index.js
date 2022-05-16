import React, { useEffect, useRef, useState } from "react";
import { VscTrash, VscEdit, VscAdd } from "react-icons/vsc";

import { ButtonSuccess, ButtonDanger, ButtonDefault, Input, Modal } from "../../components";

import { CategoriasAPI, ProdutosAPI } from "../../api";
import * as Utils from "../../utils";

import image_not_found from "../../assets/img_not_found.png";

function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  
  const [modalAdd, setModalAdd] = useState({ open: false });
  const [modalEdit, setModalEdit] = useState({ 
    open: false,
    payload: null
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
  
  /* -- Begin: ModalAdd Methods -- */

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

  /* -- End: ModalAdd Methods -- */

  /* -- Begin: ModalEdit Methods -- */
  
  const handleOpenModalEdit = payload =>
    setModalEdit({
      open: true,
      payload
    });
  
  const handleCloseModalEdit = () =>
    setModalEdit({
      open: false,
      payload: null
    });

  const handleEdit = () => {
    const input = editRef.current;
    
    const handleSuccess = () => {
      setCategorias(categorias);
      input.value = "";
      handleCloseModalEdit();
    }

    const handleError = err => {
      console.error(err);
      handleCloseModalEdit();
    }
    
    if (!validate(input))
      return;
    
    let categoria = modalEdit.payload;
    categoria.nm_categoria = input.value;

    CategoriasAPI.edit(categoria)
      .then(handleSuccess)
      .catch(handleError);
  }

  /* -- End: ModalAdd Methods -- */

  const handleDelete = (index) => {
    const categoria = categorias.filter((c, i) => i === index)[0];
    const _categorias = categorias.filter((c, i) => i !== index);
    
    CategoriasAPI.delete(categoria.id_categoria)
      .then(() => {
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
        const blob = Utils.setBlob(res.payload);
        const filename = Utils.retiraAcentos(res.payload[0].nm_categoria);
        Utils.downloadBlob(blob, filename);
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
                    <button type="button" onClick={() => handleOpenModalEdit(categoria)}>
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

      <Modal
        open={modalEdit.open}
        title="Editar categoria"
        content={<input ref={editRef} placeholder={modalEdit.payload ? modalEdit.payload.nm_categoria: ""} />}
        onAgree={() => handleEdit()}
        onDisagree={() => handleCloseModalEdit()}
        onClose={() => handleCloseModalEdit()}
      />

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