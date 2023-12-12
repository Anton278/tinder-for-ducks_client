import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useForm } from "react-hook-form";

import SectionTitle from "../SectionTitle";
import Input from "../../Input";
import { passwordRegex } from "const";

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
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <Button variant="primary" type="submit">
            Reset password
          </Button>
        </Styled.SubmitBtnWrapper>
      </Form>
    </section>
  );
}

export default ChangePassword;
