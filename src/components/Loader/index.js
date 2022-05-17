import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const rotate = keyframes `
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div `
  display: flex;
  align-items: center;
`

const LoaderIcon = styled(FiLoader) `
  margin-right: 5px;
  
  animation: ${rotate} 1s linear infinite;
`;

const LoaderStatus = styled.span.attrs(props => ({
  children: props.status
}))``;

const Loader = ({status}) => {
  return (
    <LoaderContainer>
      <LoaderIcon />
      <LoaderStatus status={status} />
    </LoaderContainer>
  )
}

const loadingLine = keyframes `
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
`;

export const Skeleton = styled.div `
  width: ${props => props.width};
  height: ${props => props.height};
  
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${loadingLine};
  animation-timing-function: linear;
  background: #ccc;
  background: linear-gradient(to right, #ccc 8%, #F0F0F0 18%, #ccc 33%);
  background-size: 800px 104px;
  position: relative;
`

export default Loader;