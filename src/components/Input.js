import React, { forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef(({ ...rest }, ref) => (
  <StyledInput ref={ref} {...rest} />
));

export default Input;

const StyledInput = styled.input`
  border-radius: 20px;
  width: 100%;
  border: none;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray1};
  padding: 0 40px 0 20px;
  box-sizing: border-box;
`;
