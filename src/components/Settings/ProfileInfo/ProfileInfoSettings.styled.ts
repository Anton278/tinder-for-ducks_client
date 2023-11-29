import styled from "styled-components";

export const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 150px;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImageDeleteButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  padding: 0;
  border: none;
  cursor: pointer;
  color: #fff;
  background: var(--bs-danger);

  &:hover {
    background: #df4958;
  }
`;

export const ImgInpWrapper = styled.div`
  width: 200px;
  height: 150px;
  border: 1px dashed #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  input {
    width: 100%;
  }
`;

export const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
