import styled from "styled-components";
import Button from "react-bootstrap/Button";

export const Label = styled.label<{ $error?: boolean }>(({ $error }) => ({
  width: 180,
  height: 180,
  border: "1px solid #000",
  borderColor: $error ? "var(--bs-danger)" : "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: 8,

  "& + input": {
    display: "none",
  },
}));

export const ImageWrapper = styled.div({
  position: "relative",
  width: 180,
  height: 180,
  borderRadius: 8,

  "& > img": {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    objectFit: "cover",
  },
});

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
