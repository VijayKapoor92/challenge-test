import styled from "styled-components";

export const Input = styled.input `
  width: 100%;
  border: 1px solid rgba(0, 0, 0, .24);
  border-radius: .3rem;
  padding: .4rem;
  font-size: .84375rem;
  outline: 0;

  &:focus {
    border-color: rgba(0, 0, 0, .34);
  }
`;

export const Select = styled.select `
  width: 100%;
  border: 1px solid rgba(0, 0, 0, .24);
  border-radius: .2rem;
  padding: .4rem;
  font-size: .84375rem;
`;