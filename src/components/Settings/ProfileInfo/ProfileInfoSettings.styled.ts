import styled from "styled-components";
import { Button } from "react-bootstrap";

export const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

export const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const RemoveButton = styled(Button)({
  position: "absolute",
  top: -12,
  right: -12,
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: "50%",
}) as typeof Button;

export const RemoveIcon = styled.div({
  width: 20,
  height: 5,
  background: "#fff",
  borderRadius: 4,
});
