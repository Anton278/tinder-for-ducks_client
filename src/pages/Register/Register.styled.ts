import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const ImagesList = styled.ol``;
export const ImagesListItem = styled.li`
  position: relative;
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

export const RemoveButton = styled.button`
  position: absolute;
  top: -16px;
  right: -16px;
  padding: 0;
  border: none;
  background: #dc3545;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;

  &:hover {
    background: #bb2d3b;
  }
`;
