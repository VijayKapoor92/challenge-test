import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import "./index.css";

const ModalContainer = styled.div `
  position: fixed;
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  z-index: 100;

  display: ${props => props.open ? "block" : "none"};
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
const ModalWindow = ({transition, children}) => {
  return (
    <div className={`modal-window ${transition ? "open" : ""}`}>
      {children}
    </div>
  )
}

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

const ModalContent = styled.div.attrs(props => ({
    children: props.content
}))`
  padding-right: .5rem;
`;

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

const Modal = ({open, title, content, onAgree, onDisagree}) => {
  const [transition, setTransition] = useState(false);
  
  let timeout = null;
  useEffect(() => {
    if (!open)
      return;
    
    if (timeout)
      clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      setTransition(true);
    }, 10);
  }, [open]);

  return (
    <ModalContainer open={open}>
      <Backdrop />
      <ModalWindow transition={transition}>
        <ModalTitle title={title} />
        {typeof content === "object" && content}
        {typeof content === "string" && (
          <ModalContent content={content} />
        )}
        <ModalActions onAgree={onAgree} onDisagree={onDisagree} />
      </ModalWindow>
    </ModalContainer>
  )
}

export default Modal;