import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

import { passwordRegex } from "../../const";
import Layout from "../../components/Layout";
import Eye from "../../components/Icons/Eye";
import EyeSlash from "../../components/Icons/EyeSlash";
import { getFromSS } from "../../utils/getFromSS";
import { useDebounce } from "../../hooks/useDebounce";
import authService from "../../services/auth";
import { useAuth } from "../../stores/auth";
import { api } from "../../http/api";

import * as Styled from "./Register.styled";
import usersService from "../../services/users";

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
    setValue,
    reset,
    setError,
    clearErrors,
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  // const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const setIsAuthed = useAuth((state) => state.setIsAuthed);

  const username = useDebounce(watch("username"));
  const duckDescription = useDebounce(watch("description"));

  console.log(errors);

  const initStorage = () => {
    sessionStorage.setItem(
      "registerFormData",
      JSON.stringify({
        username: "",
        duckDescription: "",
      })
    );
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      // setError("");
      setIsSending(true);
      const res = await authService.register({ ...data, ...images });
      localStorage.setItem("accessToken", res.accessToken);
      api.defaults.headers["Access-Token"] = `Bearer ${res.accessToken}`;
      setIsAuthed(true);
      reset();
      initStorage();
    } catch (err: any) {
      // setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const registerFormData = getFromSS<{
      username: string;
      duckDescription: string;
    }>("registerFormData");
    if (registerFormData !== null) {
      setValue("username", registerFormData.username);
      setValue("description", registerFormData.duckDescription);
    } else {
      initStorage();
    }

    append("");
  }, []);

  useEffect(() => {
    if (
      typeof username === "undefined" ||
      typeof duckDescription === "undefined"
    ) {
      return;
    }
    const registerFormData = getFromSS<{
      username: string;
      duckDescription: string;
    }>("registerFormData");
    if (registerFormData === null) {
      return;
    }
    if (
      registerFormData.username === username &&
      registerFormData.duckDescription === duckDescription
    ) {
      return;
    }
    sessionStorage.setItem(
      "registerFormData",
      JSON.stringify({
        username,
        duckDescription,
      })
    );
  }, [username, duckDescription]);

  console.log(username);

  useEffect(() => {
    if (typeof username === "undefined") {
      return;
    }
    async function someFn() {
      try {
        setIsLoading(true);
        const users = await usersService.getAll();
        const user = users.find((user) => user.username === username);
        if (user) {
          setError("username", {
            type: "custom",
            message: `Username ${user.username} is already taken`,
          });
        } else {
          clearErrors("username");
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }

    someFn();
  }, [username]);

  return (
    <Layout>
      <Styled.Wrapper>
        <div style={{ maxWidth: 370, width: "100%" }}>
          <Styled.Title>Registration</Styled.Title>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <div style={{ position: "relative" }}>
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
                  // isInvalid={!!errors.username}
                  // isInvalid={true}
                  style={{ paddingRight: "calc(1.5em + 0.75rem)" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                  }}
                >
                  <Spinner animation="border" size="sm" variant="secondary" />
                </div>
              </div>
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  {errors.username.type === "required"
                    ? "Required"
                    : errors.username.type === "custom"
                    ? errors.username.message
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
              <Button type="reset" variant="secondary" onClick={initStorage}>
                Reset
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={isSending || isLoading}
              >
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
