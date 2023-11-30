import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

import type { RegisterInputs } from "pages/Register";
import { emailRegex, passwordRegex } from "const";
import Input from "components/Input";

type Props = {
  activeStep: number;
  register: UseFormRegister<RegisterInputs>;
  errors: FieldErrors<RegisterInputs>;
  watch: UseFormWatch<RegisterInputs>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function RegisterFormFirstStep({
  activeStep,
  register,
  errors,
  watch,
  setActiveStep,
}: Props) {
  return (
    <div style={{ display: activeStep === 1 ? "block" : "none" }}>
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
        {errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email.type === "required" ? "Required" : "Invalid email"}
          </Form.Control.Feedback>
        )}
      </Form.Group>

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
        {errors.repeatPassword && (
          <Form.Control.Feedback type="invalid">
            {errors.repeatPassword.type === "required"
              ? "Required"
              : "Password doesn't match"}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outline-primary" onClick={() => setActiveStep(2)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default RegisterFormFirstStep;
