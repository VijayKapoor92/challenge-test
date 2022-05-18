import styled from "styled-components";

export const CardList = styled.div `
  display: flex;
  flex-wrap: wrap;

  margin-right: -20px;
`;

export const CardListItem = styled.div `
  max-width: 20%;
  flex-basis: 20%;
`;

export const Card = styled.div `
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, .24);
  border-radius: .2rem;

  margin-right: 20px;
  margin-bottom: 15px;

  cursor: pointer;
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, .1), 
              0 4px 0 0 rgba(0, 0, 0, .1);
  
  transition: box-shadow 150ms ease-in-out;

  &:hover {
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, .1);
  }
  
  &:active {
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0);
  }
`;

export const CardHeader = styled.div `
  padding: 15px 10px;
  margin-left: 5px;
  margin-bottom: 5px;

  display: flex;
  align-items: center;

  & > span {
    font-size: 1.1rem;
    font-weight: bold;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const CardDetails = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #CFD8DC;
  height: 60px;
  
  padding: 15px 10px;

  & > div:first-child {
    font-size: 1.3rem;
    color: #607D8B;
    font-weight: bold;
  }

  & > div:last-child {
    color: #607D8B;
    font-weight: bold;
  }
`;

export const CardActions = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 15px;
  padding-bottom: 15px;
`;