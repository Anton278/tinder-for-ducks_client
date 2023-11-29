import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as Styled from "./ProfileInfoSettings.styled";
import SectionTitle from "../SectionTitle";

function ProfileInfoSettings() {
  return (
    <section>
      <Form>
        <SectionTitle>Profile Info</SectionTitle>
        <Styled.Images>
          <Styled.ImageWrapper>
            <Styled.ImageDeleteButton type="button">X</Styled.ImageDeleteButton>
            <img src="/duck.jfif" alt="" />
          </Styled.ImageWrapper>
          <Styled.ImageWrapper>
            <Styled.ImageDeleteButton type="button">X</Styled.ImageDeleteButton>
            <img src="/duck.jfif" alt="" />
          </Styled.ImageWrapper>
          <Styled.ImageWrapper>
            <Styled.ImageDeleteButton type="button">X</Styled.ImageDeleteButton>
            <img src="/duck.jfif" alt="" />
          </Styled.ImageWrapper>
          <Styled.ImgInpWrapper>
            <input type="file" name="" id="" />
          </Styled.ImgInpWrapper>
          <Styled.ImgInpWrapper>
            <input type="file" name="" id="" />
          </Styled.ImgInpWrapper>
        </Styled.Images>
        <hr />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Duck description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Styled.SubmitBtnWrapper>
          <Button variant="primary">Save</Button>
        </Styled.SubmitBtnWrapper>
      </Form>
    </section>
  );
}

export default ProfileInfoSettings;
