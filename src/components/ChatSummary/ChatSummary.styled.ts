import styled from "styled-components";
import { Link } from "react-router-dom";

export const ChatSummary = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 20px;

  p {
    margin: 0;
  }
  p:first-of-type {
    margin-bottom: 5px;
  }
`;
