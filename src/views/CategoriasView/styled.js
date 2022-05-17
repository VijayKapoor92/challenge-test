import React from "react";
import styled from "styled-components";
import { VscTag } from "react-icons/vsc";
import {
  Card,
  CardActions,
  CardHeader,
  CardList,
  CardListItem,
  ButtonDanger,
  ButtonDefault
} from "../../components";

const CategoriaIcon = styled(VscTag) `
  margin-right: 5px;
  font-size: 1.185rem;
`;

const CardDetails = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #CFD8DC;
  height: 60px;
  
  padding: 15px 10px;

  & > div:first-child {
    font-size: 1.3rem;
    color: #607D8B;
    font-weight: bold;
  }

  & > div:last-child {
    color: #607D8B;
    font-weight: bold;
  }
`;

export const CategoriasCardList = (props) => {
  const { categorias, onEdit, onRemove } = props;
  return (
    <CardList>
      {categorias.length > 0 && categorias.map(categoria => {
        return (
          <CardListItem>
            <Card>
              <CardHeader>
                <CategoriaIcon />
                <span>{categoria.nm_categoria}</span>
              </CardHeader>
              <CardDetails>
                <div>{categoria.tl_produtos}</div>
                <div>Produtos</div>
              </CardDetails>
              <CardActions>
                <ButtonDefault 
                  label="Editar"
                  onClick={() => onEdit(categoria)}
                  width="75%"
                />
                <ButtonDanger 
                  label="Remover"
                  onClick={() => onRemove(categoria.id_categoria)}
                  width="75%"
                />
              </CardActions>
            </Card>
          </CardListItem>
        )
      })}
    </CardList>
  )
}