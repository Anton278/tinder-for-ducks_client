import styled, { keyframes } from "styled-components";
import BootstrapCard from "react-bootstrap/Card";

const dislike = keyframes`
  25% {
    transform: translate(-50%, -50%) rotate(-30deg);
    opacity: 1;
  }
  100% {
    transform: translate(-150%, -50%) rotate(-30deg);
    opacity: 0;
    display: none;
  }
`;

const like = keyframes`
  25% {
    transform: translate(-50%, -50%) rotate(30deg);
    opacity: 1;
  }
  100% {
    transform: translate(50%, -50%) rotate(30deg);
    opacity: 0;
    display: none;
  }
`;

export const Card = styled(BootstrapCard)<{
  $animName: "" | "like" | "dislike";
}>`
  width: 320px;
  overflow: hidden;
  position: absolute;
  transform: translate(-50%, -50%);
  animation-name: ${({ $animName }) =>
    $animName === "like" ? like : $animName === "dislike" ? dislike : ""};
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;
