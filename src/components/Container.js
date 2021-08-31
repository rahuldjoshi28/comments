import styled from "styled-components";
import { up } from "../theme";

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;

  ${up("md")} {
    max-width: 720px;
  }
`;
