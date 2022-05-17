import React from "react";
import styled from "styled-components";

const theme = {
  default: {
    bgcolor: "#CFD8DC",
    color: "#000000",
    borderColor: "#607D8B"
  },

  primary: {
    bgcolor: "",
    color: "",
    borderColor: ""
  },

  warning: {
    bgcolor: "",
    color: "",
    borderColor: ""
  },

  danger: {
    bgcolor: "",
    color: "",
    borderColor: ""
  },

  success: {
    bgcolor: "",
    color: "",
    borderColor: ""
  },
}

const FeedbackTitle = styled.div.attrs(props => ({
  children: (
    <>
      {props.icon}
      <h3 style={{margin:0}}>
        {props.title}
      </h3>
    </>
  )
})) `
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const Feedback = styled.div.attrs(props => ({
  type: props.type || "default",
  children: (
    <>
      <FeedbackTitle icon={props.icon} title={props.title} />
      {props.children}
    </>
  ) 
})) `
  width: fit-content;
  border: 1px solid ${props => theme[props.type].borderColor};
  border-radius: .2rem;
  background-color: ${props => theme[props.type].bgcolor};
  padding: 1rem;
`;

export default Feedback;