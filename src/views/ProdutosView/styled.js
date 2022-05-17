import React from "react";
import styled from "styled-components";

import { 
  Card, 
  CardActions, 
  CardList, 
  CardListItem,
  ButtonDanger, 
  ButtonDefault,
  Skeleton
} from "../../components";

import img_not_found from "../../assets/img_not_found.png";

const FadedOverlay = styled.div `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 1;
  background-image: linear-gradient(to bottom, transparent, #757575);
`;

const CardHeaderImage = styled.div `
  position: relative;

  width: 100%;
  height: 150px;

  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end
`;

const Title = styled.div `
  color: #FFFFFF;

  font-weight: bold;
  z-index: 2;

  margin-left: 5px;
  margin-bottom: 5px;

  /*text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;*/
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

const getBadgeColor = (qt) => {
  let a = parseInt(qt, 10);
  
  if (a === 0)
    return "#F44336";
  
  if (a <= 5)
    return "#FF5722";
  
  if (a > 5 && a <= 10)
    return "#FFA000"
  
  return "#4CAF50";
}

export const ProdutoCardSkeleton = () => {
  return (
    <div style={{width: 200, border: "1px solid #ccc"}}>
      <Skeleton width="100%" height="150px" style={{marginBottom: 15, position: "relative"}}>
        <div style={{position: "absolute", top: 5, right: 5, width: 25, height: 25, borderRadius: "50%", backgroundColor: "white"}} />
        <div style={{position: "absolute", bottom: 5, left: 5, width: "65%", height: 15, backgroundColor: "white"}} />
      </Skeleton>
      <div style={{paddingLeft: 5, paddingRight: 5}}>
        <Skeleton width="75%" height="17px" style={{marginBottom: 10}} />
        <Skeleton width="45%" height="15px" />
      </div>
      <div style={{marginTop: 20, paddingLeft: 5, paddingRight: 5, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Skeleton width="50%" height="20px" style={{marginBottom: 15}} />
        <Skeleton width="50%" height="20px" style={{marginBottom: 5}} />
      </div>
    </div>
  )
}

export const ProdutosCardList = (props) => {
  const { produtos, onEdit, onRemove } = props;

  return (
    <CardList>
      {produtos.length > 0 && produtos.map(produto => {
        return (
          <CardListItem key={produto.id_produto}>
            <Card>
              <CardHeaderImage image={img_not_found}>
                <FadedOverlay />
                <Title>{produto.nm_produto}</Title>
                <div style={{position: "absolute", top: 5, right: 5, backgroundColor: getBadgeColor(produto.qt_produto), fontSize: "small", padding: "3px 6px", borderRadius: 3, color: "white"}}>
                  {produto.qt_produto}
                </div>
              </CardHeaderImage>
              <div style={{paddingLeft: 5, paddingRight: 5}}>
                <div>{produto.nm_categoria}</div>
                <div>R${produto.vl_produto}</div>
              </div>
              <CardActions>
                <ButtonDefault 
                  label="Editar"
                  onClick={() => onEdit(produto)}
                  width="75%"
                />
                <ButtonDanger 
                  label="Remover"
                  onClick={() => onRemove(produto.id_produto)}
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