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
  const [_self, _setSelf] = useState({
    status: "closed" // closed || closing || opening || opened
  });
  
  let timeout1 = null;
  let timeout2 = null;
  
  useEffect(() => {
    if (!open)
      return;
    
    if (timeout1)
      clearTimeout(timeout1);
    
    timeout1 = setTimeout(() => {
      _setSelf({ status: "opening" });
    }, 10);

    if (timeout2)
      clearTimeout(timeout2);
    
    timeout2 = setTimeout(() => {
      _setSelf({ status: "opened" });
    }, 100);

    return () => {
      _setSelf({ status: "closing" });
      if (timeout1)
        clearTimeout(timeout1);
      
      timeout1 = setTimeout(() => {
        _setSelf({ status: "closed" });
      }, 500);

    }
  }, [open]);

  return (
    <ModalContainer status={_self.status}>
      <Backdrop />
      <ModalWindow status={_self.status}>
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