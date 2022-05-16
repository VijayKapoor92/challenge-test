import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Button, ButtonClose } from "../Buttons";

import { VscClose } from "react-icons/vsc";

import "./index.css";

const ModalContainer = styled.div.attrs(props => {
  const { status, children } = props;

  return ({
    className: `modal-container ${status}`,
    children
  })
})``;

const Backdrop = styled.div `
  position: fixed;
  top: 0; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  z-index: 100;
  background-color: rgba(0, 0, 0, .65);
`

const ModalWindow = styled.div.attrs(props => {
  const { status, children } = props;

  return ({
    className: `modal-window ${status}`,
    children
  })
})``;

const TitleContainer = styled.div `
  display: flex;
  align-items: center;
`;

const Title = styled.h3 `
  margin: .45rem 0;
  flex-grow: 1;
`;

const ModalTitle = ({title, onClose}) => {
  return (
    <TitleContainer>
      <Title>{title}</Title>
      {onClose && (
        <ButtonClose onClick={onClose}>
          <VscClose/>
        </ButtonClose>
      )}
    </TitleContainer>
  )
}

const ModalContent = styled.div.attrs(props => ({
    children: props.content
}))`
  padding: .5rem .9rem .5rem 0;
`;

const ModalActionsContainer = styled.div `
  padding-top: .45rem;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`

const ModalActionDeny = styled(Button) `
  &:hover {
    background-color: #FFEBEE;
  }
`;

const ModalActionAccept = styled(Button) `
  margin-left: .5rem;
  &:hover {
    background-color: #E8F5E9;
  }
`;

const ModalActions = ({onAgree, onDisagree}) => {
  return (
    <ModalActionsContainer>
      <ModalActionDeny 
        label="Não" 
        onClick={onDisagree} 
      />
      <ModalActionAccept 
        label="Sim"
        onClick={onAgree}
      />
    </ModalActionsContainer>
  )
}

const Modal = ({open, title, content, onClose, onAgree, onDisagree, ModalContentView, disableActions}) => {
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

    return () => {
      setTransition(false);
    }
  }, [open]);

  return (
    <ModalContainer open={open}>
      <Backdrop />
      <ModalWindow transition={transition}>
        <ModalTitle title={title} onClose={onClose} />
        {ModalContentView && ModalContentView}
        {!ModalContentView && <ModalContent content={content} />}
        {!disableActions && (
          <ModalActions 
            onAgree={onAgree}
            onDisagree={onDisagree}
          />
        )}
      </ModalWindow>
    </ModalContainer>
  )
}

export default Modal;