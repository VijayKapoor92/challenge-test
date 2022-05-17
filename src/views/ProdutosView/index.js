import React, { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

import { 
  ButtonDefault,  
  Modal,
  Feedback
} from "../../components";

import AddProdutoView from "./AddProdutoView";
import EditProdutoView from "./EditProdutoView";

import { ProdutosCardList, ProdutoCardSkeleton } from "./styled";

import { ProdutosAPI } from "../../api";

function ProdutosView() {
  const [loading, setLoading] = useState("loading");             // idle || loading
  const [produtos, setProdutos] = useState([]);
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
  
  useEffect(() => {
    ProdutosAPI.getAll()
      .then(res => {
        setProdutos(res);
        setTimeout(() => {
          setLoading("idle");
        }, 1000);
      })
      .catch(err => console.error(err));
  }, []);

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

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <h4 style={{margin: 0, marginBottom: 5}}>Produtos</h4>
        <ButtonDefault 
          label="Adicionar produto" 
          onClick={handleOpenModalAdd}
          outlined
        />
      </div>

      <div>
        {loading === "loading" && (
          <div style={{display: "flex", gap: 16}}>
            {[1,2,3].map(i => (
              <ProdutoCardSkeleton key={i} />
            ))}
          </div>
        )}
        {loading === "idle" && produtos.length > 0 && (
          <ProdutosCardList 
            produtos={produtos}
            onEdit={handleOpenModalEdit}
            onRemove={handleOpenConfirm}
          />
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
      </div>

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
    </div>
  )
}

export default ProdutosView;