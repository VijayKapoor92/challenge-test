import React from "react";
import styled from "styled-components";
import { VscTag } from "react-icons/vsc";
import { BsCurrencyDollar } from "react-icons/bs";

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
  justify-content: flex-end;

  margin-bottom: .2rem;
`;

const Title = styled.div `
  color: #FFFFFF;

  font-weight: bold;
  z-index: 2;

  margin-left: 5px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;

  /*text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;*/
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
        <div style={{position: "absolute", top: 5, right: 5, width: 15, height: 20, borderRadius: 3, backgroundColor: "white"}} />
        <div style={{position: "absolute", bottom: 5, left: 5, width: "45%", height: 25, backgroundColor: "white"}} />
      </Skeleton>
      <div style={{paddingLeft: 5, paddingRight: 5}}>
        <Skeleton width="65%" height="17px" style={{marginBottom: 10}} />
        <Skeleton width="85%" height="15px" />
      </div>
      <div style={{marginTop: 20, paddingLeft: 5, paddingRight: 5, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <Skeleton width="50%" height="15px" style={{marginBottom: 10}} />
        <Skeleton width="50%" height="15px" style={{marginBottom: 15}} />
      </div>
    </div>
  )
}

const Badge = styled.div.attrs(props => ({
  children: props.value
})) `
  position: absolute;
  top: 5px;
  right: 5px;

  font-size: small;
  padding: 3px 6px;

  border-radius: 3px;

  background-color: ${props => getBadgeColor(props.value)};
  color: #FFFFFF;
`;

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
                <Title>
                  <div style={{fontSize: "1.5rem", color: "#FFFFFF", width: "100%"}}>
                    <span style={{fontSize: "1rem", color: "#FFFFFF", fontWeight: 600}}>
                      R$
                    </span>
                    {produto.vl_produto}
                  </div>
                </Title>
                <Badge value={produto.qt_produto}/>
              </CardHeaderImage>
              <div style={{paddingLeft: 5, paddingRight: 5}}>
                <div style={{display: "flex", alignItems: "center", marginBottom: 10}}>
                  <VscTag style={{fontSize: "1.2rem", marginRight: ".3rem", color: "#616161"}} />
                  <span style={{fontWeight: 500}}>{produto.nm_categoria}</span>
                </div>
                <div style={{fontSize: "1rem", color: "#616161", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                  {produto.nm_produto}
                </div>
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