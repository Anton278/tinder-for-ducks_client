import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";

import Container from "../../components/Container";

import * as Styled from "./Login.styled";

type Inputs = {
  username: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container>
      <Styled.Wrapper>
        <div>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="john001"
                {...register("username", { required: true })}
                isInvalid={!!errors.username}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", { required: true })}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Button variant="secondary" type="reset" className="ms-auto">
                Reset
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        </div>
      </Styled.Wrapper>
    </Container>
  );
}

export default LoginPage;
