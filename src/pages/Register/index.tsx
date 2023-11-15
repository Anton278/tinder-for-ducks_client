import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

import { passwordRegex } from "../../const";
import Layout from "../../components/Layout";
import Eye from "../../components/Icons/Eye";
import EyeSlash from "../../components/Icons/EyeSlash";

import * as Styled from "./Register.styled";

type Inputs = {
  username: string;
  password: string;
  repeatPassword: string;
  images: any[];
  description: string;
};

function RegisterPage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const images = data.images.reduce((acc, image, index) => {
      if (image.value[0]) {
        const key = `image${index + 1}`;
        return { ...acc, [key]: image.value[0] };
      }
      return acc;
    }, {});
    // @ts-ignore
    delete data.images;
    console.log({ ...data, ...images });

    try {
      setError("");
      setIsSending(true);
      await axios.post(
        "http://localhost:5000/auth/register",
        { ...data, ...images },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    append("");
  }, []);

  return (
    <Layout>
      <Styled.Wrapper>
        <div style={{ maxWidth: 370, width: "100%" }}>
          <Styled.Title>Registration</Styled.Title>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="john001"
                {...register("username", {
                  required: true,
                  validate: {
                    inLowerCase: (v) => v.toLowerCase() === v,
                    withoutWhitespaces: (v) => !v.trim().includes(" "),
                  },
                })}
                isInvalid={!!errors.username}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  {errors.username.type === "required"
                    ? "Required"
                    : "Username must be in lowercase, without whitespaces"}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Label htmlFor="password">Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
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
                  {errors.password.type === "required"
                    ? "Required"
                    : "8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"}
                </Form.Control.Feedback>
              )}
            </InputGroup>

            <Form.Group className="mb-3" controlId="repeat-password">
              <Form.Label>Repeat password</Form.Label>
              <Form.Control
                type="password"
                {...register("repeatPassword", {
                  required: true,
                  validate: {
                    match: (v) => v === watch("password"),
                  },
                })}
                isInvalid={!!errors.repeatPassword}
              />
              {errors.repeatPassword && (
                <Form.Control.Feedback type="invalid">
                  {errors.repeatPassword.type === "required"
                    ? "Required"
                    : "Password doesn't match"}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <p>Duck images</p>
            <Styled.ImagesList>
              {fields.map((field, index) => (
                <Styled.ImagesListItem key={field.id}>
                  {index !== 0 && (
                    <Styled.RemoveButton
                      type="button"
                      onClick={() => remove(index)}
                    >
                      -
                    </Styled.RemoveButton>
                  )}
                  <Form.Control
                    type="file"
                    accept="image/*"
                    {...register(`images.${index}.value` as const, {
                      required: true,
                    })}
                  />
                </Styled.ImagesListItem>
              ))}
            </Styled.ImagesList>
            {fields.length < 5 && (
              <Styled.AddButtonWrapper>
                <Button
                  variant="primary"
                  type="button"
                  // @ts-ignore
                  onClick={() => append({})}
                >
                  +
                </Button>
              </Styled.AddButtonWrapper>
            )}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Duck Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("description", {
                  required: true,
                })}
                isInvalid={!!errors.description}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Styled.BottomButtons>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
              <Button variant="primary" type="submit" disabled={isSending}>
                Submit
              </Button>
            </Styled.BottomButtons>
          </Form>
        </div>
      </Styled.Wrapper>
    </Layout>
  );
}

export default RegisterPage;
