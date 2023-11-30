import type {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayRemove,
} from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { RegisterInputs } from "pages/Register";

import * as Styled from "./RegisterFormSecondStep.styled";

type Props = {
  activeStep: number;
  register: UseFormRegister<RegisterInputs>;
  fields: any[];
  remove: UseFieldArrayRemove;
  errors: FieldErrors<RegisterInputs>;
  submitButtonDisabled?: boolean;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

function RegisterFormSecondStep({
  activeStep,
  register,
  fields,
  remove,
  errors,
  submitButtonDisabled = false,
  setActiveStep,
}: Props) {
  const initStorage = () => {
    sessionStorage.setItem(
      "registerFormData",
      JSON.stringify({
        username: "",
        duckDescription: "",
      })
    );
  };

  return (
    <div style={{ display: activeStep === 2 ? "block" : "none" }}>
      <p>Duck images</p>
      <Styled.ImagesList>
        {fields.map((field, index) => (
          <Styled.ImagesListItem key={field.id}>
            {index !== 0 && (
              <Styled.RemoveButton type="button" onClick={() => remove(index)}>
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

      <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
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
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        )}
      </Form.Group>

      <Styled.BottomButtons>
        <Button
          type="reset"
          variant="outline-secondary"
          onClick={() => setActiveStep(1)}
        >
          Previous
        </Button>

        <Button
          variant="primary"
          type="submit"
          disabled={submitButtonDisabled}
          style={{ marginLeft: 15 }}
        >
          Submit
        </Button>
      </Styled.BottomButtons>
    </div>
  );
}

export default RegisterFormSecondStep;
