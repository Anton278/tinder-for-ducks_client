import Container from "../../components/Container";
import * as Styled from "./Register.styled";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegisterPage() {
  return (
    <Container>
      <Styled.Wrapper>
        <div>
          <Styled.Title>Registration</Styled.Title>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="john001" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Styled.ImagesList>
              <Styled.ImagesListItem>
                <Form.Control type="file" accept="image/*" />
              </Styled.ImagesListItem>
            </Styled.ImagesList>
            <Styled.AddButtonWrapper>
              <Button variant="primary" type="button">
                +
              </Button>
            </Styled.AddButtonWrapper>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Styled.BottomButtons>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Styled.BottomButtons>
          </Form>
        </div>
      </Styled.Wrapper>
    </Container>
  );
}

export default RegisterPage;
