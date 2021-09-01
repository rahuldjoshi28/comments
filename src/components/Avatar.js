import React from "react";
import styled from "styled-components";

export function Avatar({ src, userName, className }) {
  return <Image src={src} alt={userName} className={className} />;
}

export const Image = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;
