import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { AxiosError } from "axios";

import SectionTitle from "../SectionTitle";
import Input from "../../Input";
import { passwordRegex } from "const";
import authService from "services/auth";

import * as Styled from "./ChangePasswordSettings.styled";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      setError("");
      setIsLoading(true);
      await authService.changePassword(values.oldPassword, values.newPassword);
      toast.success("Successfully changed password!");
      reset();
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response?.status === 400
          ? "Wrong password"
          : "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={{ marginTop: 20 }}>
      <SectionTitle>Change password</SectionTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="old-password">Old password</Form.Label>
          <Input
            type="password"
            id="old-password"
            {...register("oldPassword", {
              required: true,
              pattern: passwordRegex,
            })}
            isInvalid={!!errors.oldPassword}
          />
          {errors.oldPassword && (
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {errors.oldPassword.type === "required"
                ? "Required"
                : "8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="new-password">New password</Form.Label>
          <Input
            type="password"
            id="new-password"
            {...register("newPassword", {
              required: true,
              pattern: passwordRegex,
            })}
            isInvalid={!!errors.newPassword}
          />
          {errors.newPassword && (
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {errors.newPassword.type === "required"
                ? "Required"
                : "8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="repeat-new-password">
            Repeat new password
          </Form.Label>
          <Input
            type="password"
            id="repeat-new-password"
            {...register("repeatNewPassword", {
              required: true,
              pattern: passwordRegex,
              validate: (val: string) => {
                if (watch("newPassword") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
            isInvalid={!!errors.repeatNewPassword}
          />
          {errors.repeatNewPassword && (
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {errors.repeatNewPassword.type === "required"
                ? "Required"
                : errors.repeatNewPassword.type === "pattern"
                ? "8 characters, 1 uppercase letter, 1 lowercase letter and 1 number"
                : "Your passwords do no match"}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Styled.SubmitBtnWrapper>
          <Button variant="primary" type="submit" disabled={isLoading}>
            Reset password
          </Button>
        </Styled.SubmitBtnWrapper>
        {error && (
          <Styled.ErrorMessage className="text-danger">
            {error}
          </Styled.ErrorMessage>
        )}
      </Form>
    </section>
  );
}

export default ChangePassword;
