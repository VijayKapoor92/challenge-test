import React, { useEffect, useRef, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { 
  Input, 
  Modal,
  FormGroup,
  ButtonDefault,
  Feedback,
  Container
} from "../../components";

import { 
  CategoriasCardList, 
  CategoriaCardSkeleton
} from "./styled";

import { CategoriasAPI, ProdutosAPI } from "../../api";
import * as Utils from "../../utils";
import styled, { css } from "styled-components";

const PageHeader = styled.div.attrs(props => ({
  children: (
    <Container>
      <ButtonDefault
        label="Adicionar categoria"
        onClick={props.onOpenModal}
        outlined
      />
    </Container>
  )
}))`
  padding-top: 1rem; 
  padding-bottom: 1rem; 
  position: sticky; 
  top: 56px; 
  background-color: #FAFAFA; 
  z-index: 50;

  ${props => {
    if (props.elevate)
      return css `
        box-shadow: 0 5px 0 0 rgba(0,0,0,.2);
      `;
  }}
`;

function CategoriasView() {
  const [loading, setLoading] = useState("loading");             // idle || loading
  const [importID, setImportID] = useState(null);
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
      .then(res => {
        setCategorias(res);
        setTimeout(() => {
          setLoading("idle");
        }, 1000);
      })
      .catch(err => {
        setCategorias([]);
        console.error(err);
      });
  }, []);

  const [elevate, setElevate] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleScroll = () => {
    let doIt = null;
    if (window.scrollY > 66)
      doIt = true;
    else
      doIt = false;
    
    setElevate(doIt);
  }

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
      setCategorias([...categorias, payload]);
      handleCloseModalAdd();
      input.value = "";
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
  
  let timeoutFocus = null;
  const handleOpenModalEdit = payload => {
    setModalEdit({
      open: true,
      payload: payload
    });

    if (timeoutFocus)
      clearTimeout(timeoutFocus);

    timeoutFocus = setTimeout(() => {
      editRef.current.focus();
    }, 100);
  }
  
  const handleCloseModalEdit = () =>
    setModalEdit({
      open: false,
      payload: null
    });

  const handleEdit = () => {
    const input = editRef.current;
    
    const handleSuccess = () => {
      setCategorias(categorias);
      handleCloseModalEdit();
      input.value = "";
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

  const handleDelete = id_categoria => {
    const categoria = categorias.filter(c => c.id_categoria === id_categoria)[0];
    const _categorias = categorias.filter(c => c.id_categoria !== id_categoria);
    
    CategoriasAPI.delete(categoria.id_categoria)
      .then(() => {
        setCategorias(_categorias);
        handleCloseConfirm();
      })
      .catch(err => console.error(err));
  }

  const handleOpenConfirm = id_categoria => {
    setConfirm(prevState => ({
      ...prevState,
      open: true,
      question: "Tem certeza que quer remover essa categoria?",
      onAgree: () => {
        handleDelete(id_categoria);
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

    ProdutosAPI.import({file: importRef.current.files[0], id_categoria: importID})
      .then(res => {
        let _categorias = categorias.filter(c => c.id_categoria === importID).map(c => {
          c.tl_produtos = parseInt(c.tl_produtos, 10) + parseInt(res.payload.length, 10)  
          return categorias;
        })[0];
        
        setCategorias(_categorias);
        setImportID(null);
      })
      .then(err => {
        console.error(err)
        setImportID(null);
      });
  }

  const handleImport = id_categoria => {
    setImportID(id_categoria);
    importRef.current.click();
  }

  const handleExport = id_categoria => {
    CategoriasAPI.export(id_categoria)
      .then(res => {
        // Creating a blob object from non-blob 
        // data using the Blob constructor
        const blob = Utils.setBlob(res.payload);
        const filename = Utils.setFileName(res.payload[0].nm_categoria);
        Utils.downloadBlob(blob, filename);
      })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <PageHeader
        elevate={elevate}
        onOpenModal={handleOpenModalAdd}
      />

      <Container>
        {loading === "loading" && (
          <div style={{display: "flex", gap: 16}}>
            {[1,2,3].map(i => (
              <CategoriaCardSkeleton key={i} />
            ))}
          </div>
        )}
        {loading === "idle" && categorias.length > 0 && (
          <>
            <input 
              type="file" 
              ref={importRef} 
              onChange={handleChangeFile} 
              style={{display: "none"}} 
            />
            <CategoriasCardList 
              categorias={categorias}
              onEdit={handleOpenModalEdit}
              onRemove={handleOpenConfirm}
              onExport={handleExport}
              onImport={handleImport}
            />
          </>
        )}
        {loading === "idle" && categorias.length === 0 && (
          <Feedback 
            title="Ainda não tem categoria cadastrada?" 
            icon={(
              <FaRegQuestionCircle 
                style={{fontSize: "1.1rem", marginRight: ".3rem"}} 
              />
            )}
          >
            Adicione sua primeira categoria clicando no botão <strong>Adicionar Categoria</strong>.
          </Feedback>
        )}
      </Container>

      <Modal
        open={modalAdd.open}
        title="Cadastrar categoria"
        content={(
          <FormGroup>
            <label htmlFor="nm_categoria">Nome</label>
            <Input ref={addRef} id="nm_categoria" />
          </FormGroup>
        )}
        onAgree={() => handleAdd()}
        onDisagree={handleCloseModalAdd}
        onClose={handleCloseModalAdd}
      />

      <Modal
        open={modalEdit.open}
        title="Editar categoria"
        content={(
          <FormGroup>
            <label htmlFor="nm_categoria">Nome</label>
            <Input 
              ref={editRef} 
              onFocus={() => {
                editRef.current.value = modalEdit.payload.nm_categoria;
              }}
            />
          </FormGroup>
        )}
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