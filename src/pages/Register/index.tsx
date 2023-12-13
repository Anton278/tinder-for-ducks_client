import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import type { AxiosError } from "axios";

import Layout from "../../components/Layout";
import authService from "../../services/auth";
import { useUser } from "../../stores/user";
import Input from "components/Input";
import { emailRegex, passwordRegex } from "const";
import UsernameInput from "components/business/UsernameInput";

import * as Styled from "./Register.styled";

export type RegisterInputs = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  images: any[];
  description: string;
};

function RegisterPage() {
  const setUser = useUser((state) => state.setUser);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterInputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const images = data.images.reduce((acc, image, index) => {
      if (image.value[0]) {
        const key = `image${index + 1}`;
        return { ...acc, [key]: image.value[0] };
      }
      return acc;
    }, {});
    // @ts-ignore
    delete data.images;

    try {
      setError("");
      setIsSending(true);

      const res = await authService.register({ ...data, ...images });
      setUser(res.user);
      reset();
    } catch (err: any) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data.message || "Failed to register");
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="johndoe@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.type === "required"
                  ? "Required"
                  : "Invalid email"}
              </Form.Control.Feedback>
            </Form.Group>

            <UsernameInput
              watch={watch}
              register={register}
              error={errors.username}
            />

            <Form.Label htmlFor="password">Password</Form.Label>
            <div className="mb-3">
              <Input
                type="password"
                {...register("password", {
                  required: true,
                  pattern: passwordRegex,
                })}
                id="password"
                error={
                  errors.password?.type === "required"
                    ? "Required"
                    : errors.password?.type === "pattern"
                    ? "8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"
                    : undefined
                }
              />
            </div>

            <Form.Group className="mb-4" controlId="repeat-password">
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
              <Form.Control.Feedback type="invalid">
                {errors.repeatPassword?.type === "required"
                  ? "Required"
                  : "Password doesn't match"}
              </Form.Control.Feedback>
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
              className="mb-4"
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
              <Form.Control.Feedback type="invalid">
                Required
              </Form.Control.Feedback>
            </Form.Group>

            <Styled.BottomButtons>
              <Button variant="secondary" type="reset">
                Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSending}
                style={{ marginLeft: 15 }}
              >
                Submit
              </Button>
            </Styled.BottomButtons>
          </Form>
          {error && (
            <Styled.Error className="text-danger">{error}</Styled.Error>
          )}
        </div>
      </Styled.Wrapper>
    </Layout>
  );
}

export default RegisterPage;
