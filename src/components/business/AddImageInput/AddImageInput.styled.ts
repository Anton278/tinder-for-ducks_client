import styled from "styled-components";
import { Button } from "react-bootstrap";

export const Box = styled.div({
  width: 180,
  height: 180,
  borderRadius: 8,
  border: "1px solid #000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const AddCircle = styled(Button)({
  width: 85,
  height: 85,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
}) as typeof Button;

export const AddIcon = styled.div({
  position: "relative",
  width: 50,
  height: 15,
  background: "#fff",
  borderRadius: 4,

  "&::after": {
    content: "''",
    position: "absolute",
    display: "block",
    background: "#fff",
    width: 15,
    height: 50,
    borderRadius: 4,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
});
