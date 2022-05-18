import React, { useEffect, useRef, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

import { 
  ButtonDefault,  
  Modal,
  Feedback,
  Select,
  FormGroup,
  Container
} from "../../components";

import AddProdutoView from "./AddProdutoView";
import EditProdutoView from "./EditProdutoView";

import { ProdutosCardList, ProdutoCardSkeleton } from "./styled";

import { ProdutosAPI, CategoriasAPI } from "../../api";
import styled, { css } from "styled-components";

const PageHeader = styled.div.attrs(props => ({
  children: (
    <Container>
      <ButtonDefault 
        label="Adicionar produto" 
        onClick={props.onOpenModal}
        outlined
        style={{marginRight: 15}}
      />
      <ButtonDefault 
        label="Importar produtos" 
        onClick={props.onOpenModalImport}
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

function ProdutosView() {
  const [loading, setLoading] = useState("loading");             // idle || loading
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalAdd, setModalAdd] = useState({ open: false });
  const [modalImport, setModalImport] = useState({ open: false });
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

  const importRef = useRef(null);
  const categoriaRef = useRef(null);
  
  useEffect(() => {
    ProdutosAPI.getAll()
      .then(res => {
        setProdutos(res);
        setTimeout(() => {
          setLoading("idle");
        }, 1000);
      })
      .catch(err => {
        console.error(err);
        setProdutos([]);
      });
  }, []);

  useEffect(() => {
    if (!modalImport.open)
      return;

    CategoriasAPI.getAll()
      .then(res => setCategorias(res))
      .catch(err => console.error(err));
  }, [modalImport.open]);
  
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

  const validate = fieldsValues => {
    const keys = Object.keys(fieldsValues);
    let bo = true;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "nm_categoria" && !fieldsValues[key].length) {
        alert(`Nenhum campo pode ficar vazio.`);
        bo = false;
        break;
      }
    }

    return bo;
  }

  /* -- Begin: ModalAdd Methods -- */

  const handleOpenModalAdd = () => 
    setModalAdd({ open: true });
  
  const handleCloseModalAdd = () =>
    setModalAdd({ open: false });

  const handleAdd = fieldsValues => {
    if (!validate(fieldsValues))
      return;
    
    const handleSuccess = payload => {
      setProdutos([...produtos, payload]);
      handleCloseModalAdd();
    }

    const handleError = err => {
      console.error(err);
      handleCloseModalAdd();
    }

    ProdutosAPI.add(fieldsValues)
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

  const handleEdit = fieldsValues => {
    if (!validate(fieldsValues))
      return;

    const handleSuccess = () => {
      setProdutos(produtos);
      handleCloseModalEdit();
    }

    const handleError = err => {
      console.error(err);
      handleCloseModalEdit();
    }
    
    let produto = modalEdit.payload;
    produto.nm_produto = fieldsValues["nm_produto"];
    produto.qt_produto = fieldsValues["qt_produto"];
    produto.vl_produto = fieldsValues["vl_produto"];
    produto.id_categoria = fieldsValues["id_categoria"];
    produto.nm_categoria = fieldsValues["nm_categoria"];

    ProdutosAPI.edit(produto)
      .then(handleSuccess)
      .catch(handleError);
  }

  /* -- End: ModalAdd Methods -- */

  const handleDelete = id_produto => {
    const _produtos = produtos.filter(p => p.id_produto !== id_produto);
    
    ProdutosAPI.delete(id_produto)
      .then(res => {
        setProdutos(_produtos);
        handleCloseConfirm();
      })
      .catch(err => console.error(err));
  }

  const handleOpenConfirm = id_produto => {
    setConfirm(prevState => ({
      ...prevState,
      open: true,
      question: "Tem certeza que quer remover esse produto?",
      onAgree: () => {
        handleDelete(id_produto);
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

  /* --- Begin: Import --- */

  let timeoutSuccess = null;
  const handleChangeFile = e => {
    const file = e.target.files[0];
    
    const handleSuccess = ({payload}) => {
      setProdutos([...produtos, ...payload]);
      handleCloseModalImport();

      if (timeoutSuccess)
        clearTimeout(timeoutSuccess);
      
      timeoutSuccess = setTimeout(() => {
        categoriaRef.current.value = "";
        importRef.current.value = "";
      }, 100);
    }

    const handleError = err => {
      console.error(err);
      handleCloseModalImport();
      
      if (timeoutSuccess)
        clearTimeout(timeoutSuccess);
      
      timeoutSuccess = setTimeout(() => {
        categoriaRef.current.value = "";
        importRef.current.value = "";
      }, 500);
    }

    if (file.type !== "application/json") {
      alert("O arquivo deve ser em formato json \n Ex.: [{ \"nm_produto\": \"\", \"qt_produto\": \"\", \"vl_produto\": \"\" }]");
      return;
    }

    ProdutosAPI.import({file: importRef.current.files[0], id_categoria: categoriaRef.current.value})
      .then(handleSuccess)
      .then(handleError);
  }

  const handleImport = () => {
    importRef.current.click();
  }

  const handleOpenModalImport = () => {
    setModalImport({
      open: true
    });
  }
  const handleCloseModalImport = () => {
    setModalImport({
      open: false
    });
  }

  /* --- End: Import --- */

  return (
    <div>
      <PageHeader
        elevate={elevate}
        onOpenModal={handleOpenModalAdd}
        onOpenModalImport={handleOpenModalImport}
      />

      <Container>
        {loading === "loading" && (
          <div style={{display: "flex", gap: 16}}>
            {[1,2,3].map(i => (
              <ProdutoCardSkeleton key={i} />
            ))}
          </div>
        )}
        {loading === "idle" && produtos.length > 0 && (
          <>
            <input 
              type="file" 
              ref={importRef} 
              onChange={handleChangeFile} 
              style={{display: "none"}} 
            />
            <ProdutosCardList 
              produtos={produtos}
              onEdit={handleOpenModalEdit}
              onRemove={handleOpenConfirm}
            />
          </>
        )}
        {loading === "idle" && produtos.length === 0 && (
          <Feedback 
            title="Ainda não tem produto cadastrado?" 
            icon={(
              <FaRegQuestionCircle 
                style={{fontSize: "1.1rem", marginRight: ".3rem"}} 
              />
            )}
          >
            Adicione seu primeiro produto clicando no botão <strong>Adicionar Produto</strong>.
          </Feedback>
        )}
      </Container>

      <Modal
        open={modalAdd.open}
        title="Cadastrar produto"
        ModalContentView={(
          <AddProdutoView
            onAgree={(fieldsValues) => handleAdd(fieldsValues)}
            onDisagree={handleCloseModalAdd}
          />
        )}
        onClose={handleCloseModalAdd}
        disableActions
      />

      <Modal
        open={modalEdit.open}
        title="Editar produto"
        ModalContentView={(
          <EditProdutoView
            produto={modalEdit.payload ? modalEdit.payload : {}}
            onAgree={handleEdit}
            onDisagree={handleCloseModalEdit}
          />
        )}
        onClose={handleCloseModalEdit}
        disableActions
      />

      <Modal
        open={confirm.open}
        title={confirm.title}
        content={confirm.question}
        onAgree={confirm.onAgree}
        onDisagree={confirm.onDisagree}
      />

      <Modal
        open={modalImport.open}
        title="Importar produtos"
        content={(
          <FormGroup>
            <label htmlFor="id_categoria">Upload</label>
            <Select ref={categoriaRef} id="id_categoria" defaultValue="">
              <option value="" disabled>Escolher...</option>
              {categorias.length > 0 && categorias.map(categoria => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nm_categoria}
                </option>
              ))}
            </Select>
          </FormGroup>
        )}
        onAgree={handleImport}
        onClose={handleCloseModalImport}
        labels={{
          accept: "Importar"
        }}
      />
    </div>
  )
}

export default ProdutosView;