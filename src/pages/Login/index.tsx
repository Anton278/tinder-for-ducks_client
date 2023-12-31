import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { AxiosError } from "axios";

import Layout from "../../components/Layout";
import Eye from "../../components/Icons/Eye";
import EyeSlash from "../../components/Icons/EyeSlash";
import authService from "../../services/auth";
import { api } from "../../http/api";
import { useUser } from "../../stores/user";

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

  const setUser = useUser((state) => state.setUser);

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setError("");
      setIsSending(true);
      const res = await authService.login(data);
      localStorage.setItem("accessToken", res.accessToken);
      api.defaults.headers["Access-Token"] = `Bearer ${res.accessToken}`;
      setUser(res.user);
    } catch (err: any) {
      const error = err as AxiosError;
      setError(
        error.response?.status === 400
          ? "Wrong username or password"
          : "Failed to login"
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <Styled.Wrapper>
        <div style={{ maxWidth: 370, width: "100%" }}>
          <Styled.Title>Login</Styled.Title>
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

            <Form.Label htmlFor="password">Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                isInvalid={!!errors.password}
                id="password"
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </Button>
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Stack direction="horizontal" gap={3}>
              <Button variant="secondary" type="reset" className="ms-auto">
                Reset
              </Button>
              <Button variant="primary" type="submit" disabled={isSending}>
                Submit
              </Button>
            </Stack>
            {error && (
              <Styled.Error className="text-danger">{error}</Styled.Error>
            )}
          </Form>
        </div>
      </Styled.Wrapper>
    </Layout>
  );
}

export default LoginPage;
