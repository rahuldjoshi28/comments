import React from "react";
import styled from "styled-components";

export default function Input({ ...rest }) {
  return <StyledInput {...rest} />;
}

const StyledInput = styled.input`
  border-radius: 20px;
  width: 100%;
  border: none;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 0 20px;
  box-sizing: border-box;
`;
