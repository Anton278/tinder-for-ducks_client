import styled from "styled-components";

export const Avatar = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  svg {
    width: 35px;
    height: 35px;
  }
`;
