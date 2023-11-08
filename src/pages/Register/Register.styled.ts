import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const ImagesList = styled.ol``;
export const ImagesListItem = styled.li`
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export const AddButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`;

export const BottomButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 15px;
`;
