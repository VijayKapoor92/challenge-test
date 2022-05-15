import React, { useEffect, useRef, useState } from "react";
import { VscTrash, VscEdit, VscAdd } from "react-icons/vsc";

import { Modal } from "../../components";
import AddProdutoView from "./AddProdutoView";
import EditProdutoView from "./EditProdutoView";

import { ProdutosAPI } from "../../api";

function ProdutosView() {
  const [produtos, setProdutos] = useState([]);
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
    ProdutosAPI.getAll()
      .then(res => {
        setProdutos(res);
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

  const handleAction = ({name, status, index}) => {
    setAction({
      name: name,
      status: status,
      index: index
    });
  }

  const handleCloseModal = () => {
    handleAction({
      name: "", 
      index: null,
      status: "idle"
    });
  }

  const handleAdd = fieldsValues => {
    if (!validate(fieldsValues))
      return;

    ProdutosAPI.add(fieldsValues)
      .then(res => {
        handleCloseModal();
        setProdutos([...produtos, res[0]]);
      })
      .catch(err => console.error(err));
  }

  const handleEdit = fieldsValues => {
    if (!validate(fieldsValues))
      return;
    
    produtos.map((p, i) => {
      if (i === action.index) {
        p.nm_produto = fieldsValues["nm_produto"];
        p.qt_produto = fieldsValues["qt_produto"];
        p.vl_produto = fieldsValues["vl_produto"];
        p.id_categoria = fieldsValues["id_categoria"];
        p.nm_categoria = fieldsValues["nm_categoria"];
      }
      
      return p;
    });

    const produto = produtos.filter((p, i) => i === action.index)[0];
    
    ProdutosAPI.edit(produto)
      .then(res => {
        setProdutos([...produtos]);
        handleCloseModal();
      })
      .catch(err => console.error(err));
  }

  const handleDelete = (index) => {
    const produto = produtos.filter((p, i) => i === index)[0];
    const _produtos = produtos.filter((p, i) => i !== index);
    
    ProdutosAPI.delete(produto.id_produto)
      .then(res => {
        setProdutos(_produtos);
        handleCloseConfirm();
      })
      .catch(err => console.error(err));
  }

  const handleOpenConfirm = (index) => {
    setConfirm(prevState => ({
      ...prevState,
      open: true,
      question: "Tem certeza que quer remover esse produto?",
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
        <h4>Produtos</h4>
        <div>
          <button type="button" onClick={() => handleAction({name: "add"})}>
            <VscAdd/>
          </button>
        </div>
      </div>
      <div>
        <ul>
          {produtos.length > 0 && produtos.map((produto, index) => {
            return (
              <li key={index}>
                <div>
                  <span>{produto.nm_produto}</span>
                  <span>{produto.qt_produto}</span>
                  <span>{produto.vl_produto}</span>
                  <span>{produto.nm_categoria}</span>
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
        open={action.name !== "" && action.name === "add"}
        title="Cadastrar produto"
        ModalContentView={(
          <AddProdutoView
            onAgree={(fieldsValues) => handleAdd(fieldsValues)}
            onDisagree={() => handleCloseModal()}
          />
        )}
        onClose={() => handleCloseModal()}
        disableActions
      />

      <Modal
        open={action.name !== "" && action.name === "edit"}
        title="Editar produto"
        ModalContentView={(
          <EditProdutoView
            produto={produtos.filter((p, i) => i === action.index)[0]}
            onAgree={(fieldsValues) => handleEdit(fieldsValues)}
            onDisagree={() => handleCloseModal()}
          />
        )}
        onClose={() => handleCloseModal()}
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