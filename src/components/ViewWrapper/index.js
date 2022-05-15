import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav";
import Container from "../Container";

const ViewWrapper = () => {
  return (
    <Container>
      <Nav />
      <Outlet/>
    </Container>
  )
}

export default ViewWrapper;