import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { CategoriasAPI } from "../../../api";
import { ModalActions } from "../../../components";

const FormGroup = styled.div `
  margin-bottom: .6rem;

  > label {
    font-size: x-small;
    font-weight: 700;
    text-transform: uppercase;
  }

  > input {
    width: 96%;
    border: 1px solid rgba(0, 0, 0, .24);
    border-radius: .2rem;
    padding: .4rem;
  }

  > select {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, .24);
    border-radius: .2rem;
    padding: .4rem;
  }
`;

function EditProdutoView(props) {
  const {onAgree, onDisagree, produto} = props;
  const [categorias, setCategorias] = useState([]);

  const nameRef = useRef(null);
  const qtRef = useRef(null);
  const vlRef = useRef(null);
  const categoriaRef = useRef(null);

  useEffect(() => {
    CategoriasAPI.getAll()
      .then(res => setCategorias(res))
      .catch(err => console.error(err));
  }, []);

  const getFieldsValues = () => ({
    nm_produto: nameRef.current.value,
    qt_produto: qtRef.current.value,
    vl_produto: vlRef.current.value,
    id_categoria: categoriaRef.current.value,
    nm_categoria: categorias.filter(c => c.id_categoria.toString() === categoriaRef.current.value.toString())[0].nm_categoria
  });

  const resetFields = () => {
    nameRef.current.value = "";
    qtRef.current.value = "";
    vlRef.current.value = "";
    categoriaRef.current.value = "";
  }

  const fillFields = () => {
    nameRef.current.value = produto.nm_produto;
    qtRef.current.value = produto.qt_produto;
    vlRef.current.value = produto.vl_produto;
    categoriaRef.current.value = produto.id_categoria;
  }

  if (produto && Object.keys(produto).length) 
    fillFields();

  return (
    <>
      <div>
        <FormGroup>
          <label htmlFor="id_categoria">Categoria:</label>
          <select ref={categoriaRef} id="id_categoria">
            <option value="" disabled>Escolher...</option>
            {categorias.length > 0 && categorias.map(categoria => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nm_categoria}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="nm_produto">Nome:</label>
          <input ref={nameRef} id="nm_produto" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="qt_produto">Quantidade:</label>
          <input type="number" ref={qtRef} id="qt_produto" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="qt_produto">Valor:</label>
          <input id="vl_produto" ref={vlRef} />
        </FormGroup>
      </div>
      <ModalActions
        labels={{
          deny: "Cancelar",
          accept: "Atualizar"
        }}
        onDisagree={onDisagree}
        onAgree={() => {
          onAgree(getFieldsValues());
          resetFields();
        }}
      />
    </>
  )
}

export default EditProdutoView;