import styled from "styled-components";
import BootstrapForm from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// min-height = header + container margin
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 96px);
`;

export const Title = styled.h1`
  margin-top: 0;
  text-align: center;
  margin-bottom: 40px;
`;

export const Error = styled.p`
  margin-top: 20px;
  text-align: center;
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
  margin-top: 30px;
`;

// export const RemoveButton = styled.button`
//   position: absolute;
//   top: -16px;
//   right: -16px;
//   padding: 0;
//   border: none;
//   background: #dc3545;
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   color: #fff;

//   &:hover {
//     background: #bb2d3b;
//   }

//   @media (min-width: 0px) {
//     right: -8px;
//   }
//   @media (min-width: 576px) {
//     right: -16px;
//   }
// `;

export const Form = styled(BootstrapForm)({
  maxWidth: 720,
});

export const Images = styled.div({
  gridColumn: "1 / 3",
});

export const UserInfoSection = styled.section({
  // display: "grid",
  gridTemplateColumns: "1fr 1fr",
});

export const UserInfoSectionInner = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 20,
  rowGap: 25,
});

export const SectionTitle = styled.h3({
  marginBottom: 35,
});

export const AddImageInput = styled.div({
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

export const ImageInputWrapper = styled.div({
  position: "relative",
  width: "fit-content",
});

export const UploadImagesWrapper = styled.div({
  display: "flex",
  flexWrap: "wrap",
  columnGap: 25,
  rowGap: 20,
  marginBottom: 25,
});
