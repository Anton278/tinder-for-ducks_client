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
import ImageInput from "components/UI/ImageInput";

import * as Styled from "./Register.styled";

export type RegisterInputs = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  images: { image: File | null }[];
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
  const {
    fields: images,
    append,
    update,
    remove,
  } = useFieldArray({
    control,
    name: "images",
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [addedImagesError, setAddedImagesError] = useState(false);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const images = data.images.reduce((acc, image, index) => {
      if (image.image) {
        const key = `image${index + 1}`;
        return { ...acc, [key]: image.image };
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
    append({ image: null });
  }, []);

  return (
    <Layout>
      <Styled.Wrapper>
        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          <Styled.Title>Registration</Styled.Title>
          <Styled.UserInfoSection>
            <Styled.SectionTitle>Your info</Styled.SectionTitle>
            <Styled.UserInfoSectionInner>
              <Form.Group controlId="email">
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

              <div>
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
            </Styled.UserInfoSectionInner>
          </Styled.UserInfoSection>
          <section>
            <Styled.SectionTitle>Duck</Styled.SectionTitle>
            <Styled.UploadImagesWrapper>
              {images.map(({ image, id }, index) => (
                <Styled.ImageInputWrapper key={id}>
                  {!image && index !== 0 && (
                    <Styled.RemoveButton
                      variant="danger"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <Styled.RemoveIcon />
                    </Styled.RemoveButton>
                  )}
                  <ImageInput
                    image={image}
                    register={register}
                    registerName={`images.${index}.image`}
                    onChange={(image) => update(index, { image })}
                    onRemove={() => update(index, { image: null })}
                    error={!!errors?.images?.[index]}
                  />
                </Styled.ImageInputWrapper>
              ))}
              {images.length < 5 && (
                <Styled.AddImageInput>
                  <Styled.AddCircle
                    variant="warning"
                    type="button"
                    onClick={() => append({ image: null })}
                  >
                    <Styled.AddIcon />
                  </Styled.AddCircle>
                </Styled.AddImageInput>
              )}
            </Styled.UploadImagesWrapper>

            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              style={{ gridColumn: "1 / 3" }}
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

            <Styled.BottomButtons style={{ gridColumn: "1 / 3" }}>
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
          </section>
          {error && (
            <Styled.Error className="text-danger">{error}</Styled.Error>
          )}
        </Styled.Form>
      </Styled.Wrapper>
    </Layout>
  );
}

export default RegisterPage;
