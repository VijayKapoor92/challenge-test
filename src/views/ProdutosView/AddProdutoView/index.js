import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { CategoriasAPI } from "../../../api";
import { ModalActions, Input, Select, FormGroup } from "../../../components";

function AddProdutoView(props) {
  const {onAgree, onDisagree} = props;
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
    id_categoria: categoriaRef.current.value
  });

  const resetFields = () => {
    nameRef.current.value = "";
    qtRef.current.value = "";
    vlRef.current.value = "";
    categoriaRef.current.value = "";
  }

  return (
    <>
      <div style={{paddingRight: "1rem"}}>
        <FormGroup style={{marginRight: "-1rem"}}>
          <label htmlFor="id_categoria">Categoria</label>
          <Select ref={categoriaRef} id="id_categoria" defaultValue="">
            <option value="" disabled>Escolher...</option>
            {categorias.length > 0 && categorias.map(categoria => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nm_categoria}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <label htmlFor="nm_produto">Nome</label>
          <Input ref={nameRef} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="qt_produto">Quantidade</label>
          <Input type="number" ref={qtRef} id="qt_produto" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="qt_produto">Valor</label>
          <Input id="vl_produto" ref={vlRef} />
        </FormGroup>
      </div>
      <ModalActions
        labels={{
          deny: "Cancelar",
          accept: "Adicionar"
        }}
        onAgree={() => {
          onAgree(getFieldsValues());
          resetFields();
        }}
        onDisagree={onDisagree}
      />
    </>
  )
}

export default AddProdutoView;