import styled from "styled-components";

const FormGroup = styled.div `
  margin-bottom: .6rem;

  > label {
    font-size: xx-small;
    color: #424242;
    font-weight: 700;
    text-transform: uppercase;
    
    transition: all 100ms ease-in-out;
  }

  &:focus-within > label {
    color: #000000;
    font-size: x-small;
  }

`;

export default FormGroup;