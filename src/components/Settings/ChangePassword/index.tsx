import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import SectionTitle from "../SectionTitle";
import Input from "../../Input";

import * as Styled from "./ChangePasswordSettings.styled";

function ChangePassword() {
  return (
    <section style={{ marginTop: 20 }}>
      <SectionTitle>Change password</SectionTitle>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="old-password">Old password</Form.Label>
          <Input type="password" id="old-password" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="new-password">New password</Form.Label>
          <Input type="password" id="new-password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="repeat-new-password">
            Repeat new password
          </Form.Label>
          <Input type="password" id="repeat-new-password" />
        </Form.Group>
        <Styled.SubmitBtnWrapper>
          <Button variant="primary">Reset password</Button>
        </Styled.SubmitBtnWrapper>
      </Form>
    </section>
  );
}

export default ChangePassword;
