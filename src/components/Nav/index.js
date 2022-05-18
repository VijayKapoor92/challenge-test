import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Container from "../Container";

const links = ([
  { name: "Categorias", to: "/" },
  { name: "Produtos", to: "/produtos" }
]);

const Header = styled.header `
  width: 100%;

  position: sticky;
  top: 0;
  z-index: 50;
  
  background-color: #FAFAFA;
`;

const Toolbar = styled.div `
  height: 56px;

  display: flex;
  align-items: center;
`;

const TabLink = styled(Link) `
  padding: 5px 0;

  border-bottom: 3px solid transparent;
  color: #757575;
  
  min-width: 90px;
  max-width: 120px;
  
  text-decoration: none;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;

  transition: all 150ms ease-in-out;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &.active {
    border-color: #607D8B;
    color: #000000;
  }

  &:focus {
    color: #000000;
  }
`;

const Nav = () => {
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("produtos"))
      return "Produtos";
    
    return "Categorias";
  }
  
  const title = getTitle();

  return (
    <Header>
      <Container>
        <Toolbar>
          {links.map(link => (
            <TabLink key={link.name} to={link.to} className={link.name === title ? "active" : ""}>
              {link.name}
            </TabLink>
          ))}
        </Toolbar>
      </Container>
    </Header>
  )
}

export default Nav;