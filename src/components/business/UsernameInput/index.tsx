import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import type { AxiosError } from "axios";
import type {
  UseFormWatch,
  UseFormRegister,
  FieldError,
} from "react-hook-form";

import type { RegisterInputs } from "pages/Register";
import { useDebounce } from "hooks/useDebounce";
import authService from "services/auth";

import * as Styled from "./UsernameInput.styled";

type UsernameInputProps = {
  watch: UseFormWatch<RegisterInputs>;
  register: UseFormRegister<RegisterInputs>;
  error: FieldError | undefined;
};

function UsernameInput({ watch, register, error }: UsernameInputProps) {
  const username = useDebounce(watch("username"));
  const [isLoading, setIsLoading] = useState(false);
  const [isUnique, setIsUnique] = useState(true);

  useEffect(() => {
    if (!username) {
      return;
    }
    const checkUsernameUniqueness = async () => {
      try {
        setIsLoading(true);
        await authService.checkUsernameUniqueness(username);
        setIsUnique(true);
      } catch (err) {
        const error = err as AxiosError;
        setIsUnique(error.response?.status !== 409);
      } finally {
        setIsLoading(false);
      }
    };

    checkUsernameUniqueness();
  }, [username]);

  return (
    <Form.Group className="mb-3" controlId="username">
      <Form.Label>Username</Form.Label>
      <Styled.UsernameInpWrapper>
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
          style={{
            paddingRight: isLoading ? 36 : "calc(1.5em + 0.75rem)",
          }}
          isInvalid={!!error || !isUnique}
        />
        {isLoading && (
          <Styled.SpinnerWrapper>
            <Spinner size="sm" variant="secondary" />
          </Styled.SpinnerWrapper>
        )}
      </Styled.UsernameInpWrapper>
      {error ? (
        <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
          {error?.type === "required"
            ? "Required"
            : "Username must be in lowercase, without whitespaces"}
        </Form.Control.Feedback>
      ) : (
        !isUnique && <Styled.HelperError>Username taken</Styled.HelperError>
      )}
    </Form.Group>
  );
}

export default UsernameInput;
