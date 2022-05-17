import styled from "styled-components";

export const Button = styled.button.attrs(props => ({
  type: "button",
  children: props.label,
  onClick: props.onClick
})) `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  
  width: ${props => props.width || "auto"};

  padding: .2rem .5rem;

  background-color: #FFFFFF;
  border: none;
  border-radius: .2rem;

  font-size: .9rem;
  font-weight: 500;
  
  text-transform: uppercase;
  text-align: center;
  vertical-align: middle;
  color: #000000;

  transition: background-color 150ms ease-in-out;

  cursor: pointer;
`;

export const ButtonDefault = styled(Button)`
  &:hover {
    background-color: #EEEEEE;
  }
`;

export const ButtonSuccess = styled(Button) `
  color: #2E7D32;
  &:hover {
    background-color: #E8F5E9;
  }
`;

export const ButtonDanger = styled(Button)`
  color: #C62828;  
  &:hover {
    background-color: #FFEBEE;
  }
`;

export const ButtonClose = styled.button.attrs(props => ({
  type: "button",
  onClick: props.onClick,
  children: props.children
})) `
  padding: 6px;
  vertical-align: middle;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  
  border: none;
  border-radius: 50%;

  background-color: #FFFFFF;
  cursor: pointer;
  font-size: 1rem;

  transition: background-color 100ms linear, color 100ms linear;

  &:hover {
    background-color: #F5F5F5;
    color: #000000;
  }
`;

export const ButtonIcon = styled.button.attrs(props => ({
  type: "button",
  onClick: props.onClick,
  children: props.children
})) `
  padding: 6px;
  vertical-align: middle;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  
  border: none;
  border-radius: 50%;

  background-color: #FFFFFF;
  cursor: pointer;
  font-size: 1rem;

  transition: background-color 100ms linear, color 100ms linear;

  &:hover {
    background-color: #F5F5F5;
    color: #000000;
  }
`;

export const ButtonModalDeny = styled(Button) `
  &:hover {
    background-color: #FFEBEE;
  }
`;

export const ButtonModalAccept = styled(Button) `
  margin-left: .5rem;
  &:hover {
    background-color: #E8F5E9;
  }
`;