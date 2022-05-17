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
  ButtonDefault,
  ButtonPrimary,
  Skeleton
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

export const CategoriaCardSkeleton = () => {
  return (
    <div style={{width: 200, border: "1px solid #ccc", borderRadius: ".2rem"}}>
      <div style={{padding: "15px 10px"}}>
        <Skeleton width="95%" height="25px" />
      </div>
      <div style={{height: 80, backgroundColor: "rgba(0,0,0,.04)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Skeleton width="10%" height="20px" style={{marginBottom: 10}} />
        <Skeleton width="35%" height="15px" />
      </div>
      <div style={{marginTop: 20, paddingLeft: 5, paddingRight: 5, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Skeleton width="50%" height="20px" style={{marginBottom: 15}} />
        <Skeleton width="50%" height="20px" style={{marginBottom: 5}} />
        <Skeleton width="50%" height="20px" style={{marginBottom: 15}} />
        <Skeleton width="50%" height="20px" style={{marginBottom: 5}} />
      </div>
    </div>
  )
}

export const CategoriasCardList = (props) => {
  const { categorias, onEdit, onRemove, onExport, onImport } = props;
  return (
    <CardList>
      {categorias.length > 0 && categorias.map(categoria => {
        return (
          <CardListItem key={categoria.id_categoria}>
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
                  style={{marginBottom: 10}}
                />
                <ButtonPrimary
                  label="Exportar"
                  onClick={() => onExport(categoria.id_categoria)}
                  width="75%"
                  disabled={parseInt(categoria.tl_produtos, 10) === 0}
                />
                <ButtonPrimary
                  label="Importar"
                  onClick={() => onImport(categoria.id_categoria)}
                  width="75%"
                />
                <ButtonDanger 
                  label="Remover"
                  onClick={() => onRemove(categoria.id_categoria)}
                  width="75%"
                  disabled={parseInt(categoria.tl_produtos, 10) > 0}
                  style={{marginTop: 10}}
                />
              </CardActions>
            </Card>
          </CardListItem>
        )
      })}
    </CardList>
  )
}