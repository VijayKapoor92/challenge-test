import styled from "styled-components";

export const Input = styled.input `
  width: 100%;
  border: 1px solid #757575;
  border-radius: .3rem;
  padding: .4rem;
  font-size: .84375rem;
  outline: 0;

  transition: border-color 100ms linear;

  &:focus {
    border-color: #000000;
  }
`;

export const Select = styled.select `
  width: 100%;
  border: 1px solid #757575;
  border-radius: .2rem;
  padding: .4rem;
  font-size: .84375rem;
  outline: 0;

  transition: border-color 100ms linear;

  &:focus {
    border-color: #000000;
  }
`;