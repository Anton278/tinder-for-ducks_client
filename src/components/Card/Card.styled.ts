import styled from "styled-components";
import BootstrapCard from "react-bootstrap/Card";

export const Card = styled(BootstrapCard)<{ $swipable: boolean }>`
  width: 320px;
  overflow: hidden;
  ${({ $swipable }) =>
    $swipable &&
    `
  position: absolute;
  transition: transform 0.15s ease-out;
  `}
`;
