import React from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";

const ModalContainer = styled.div `
  position: fixed;
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  z-index: 100;
`;

const Backdrop = styled.div `
  position: fixed;
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  z-index: 100;
  background-color: rgba(0, 0, 0, .65);
`
const ModalWindow = styled.div `
  position: absolute; 
  top: 50%; 
  background-color: white;
  z-index: 101; 
`;

const ModalTitle = ({title, onClose}) => {
  return (
    <div>
      <h5>{title}</h5>
      {onClose && (
        <button type="button" onClick={onClose}>
          <VscClose/>
        </button>
      )}
    </div>
  )
}

const ModalContent = ({content}) => {
  return (
    <div>
      {content}
    </div>
  )
}

const ModalActions = ({onAgree, onDisagree}) => {
  return (
    <div>
      <button type="button" onClick={onDisagree}>
        Não
      </button>
      <button type="button" onClick={onAgree}>
        Sim
      </button>
    </div>
  )
}

const Modal = ({open, title, content, onAgree, onDisagree, windowComponent}) => {
  return open && (
    <ModalContainer>
      <Backdrop />
      {windowComponent && windowComponent}
      {!windowComponent && (
        <ModalWindow>
          <ModalTitle title={title} />
          <ModalContent content={content} />
          <ModalActions onAgree={onAgree} onDisagree={onDisagree} />
        </ModalWindow>
      )}
    </ModalContainer>
  )
}

export default Modal;