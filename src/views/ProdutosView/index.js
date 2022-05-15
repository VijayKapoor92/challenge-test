import React, { useEffect, useRef, useState } from "react";
import { VscTrash, VscEdit, VscAdd } from "react-icons/vsc";

import { Modal } from "../../components";
import AddProdutoView from "./AddProdutoView";

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
        console.log(res);
      })
      .catch(err => console.error(err));
  }, []);

  const validate = fieldsValues => {
    const keys = Object.keys(fieldsValues);
    let bo = true;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!fieldsValues[key].length) {
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
      index
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

  const handleEdit = () => {
    const input = editRef.current;
    if (!validate(input))
      return;
    
    // categorias.map((c, i) => {
    //   if (i === action.index)
    //     c.nm_categoria = input.value;
      
    //   return c;
    // });

    // const categoria = categorias.filter((c,i) => i === action.index)[0];

    // CategoriasAPI.edit(categoria)
    //   .then(res => {
    //     setCategorias([...categorias]);
    //     input.value = "";
    //     handleAction();
    //   })
    //   .catch(err => console.error(err));
  }

  const handleDelete = (index) => {
    // const categoria = categorias.filter((c, i) => i === index)[0];
    // const _categorias = categorias.filter((c, i) => i !== index);
    
    // CategoriasAPI.delete(categoria.id_categoria)
    //   .then(res => {
    //     setCategorias(_categorias);
    //     handleCloseConfirm();
    //   })
    //   .catch(err => console.error(err));
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
            onDisagree={() =>handleCloseModal()}
          />
        )}
        onClose={() => handleCloseModal()}
        disableActions
      />
    </div>
  )
}

export default ProdutosView;