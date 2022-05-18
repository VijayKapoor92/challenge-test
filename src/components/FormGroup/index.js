import styled from "styled-components";

const FormGroup = styled.div `
  margin-bottom: .6rem;

  > label {
    font-size: 10px;
    color: #424242;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    transition: all 100ms ease-in-out;
  }

  &:focus-within > label {
    color: #000000;
    font-size: 12px;
  }

`;

export default FormGroup;