import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import Container from "../../components/Container";

import * as Styled from "./Register.styled";

type Inputs = {
  username: string;
  password: string;
  images: any[];
  description: string;
};

function RegisterPage() {
  const { control, register, handleSubmit } = useForm<Inputs>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "images",
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Container>
      <Styled.Wrapper>
        <div style={{ maxWidth: 370, width: "100%" }}>
          <Styled.Title>Registration</Styled.Title>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="john001" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Styled.ImagesList>
              {fields.map((field, index) => (
                <Styled.ImagesListItem key={field.id}>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    {...register(`images.${index}.value`)}
                  />
                </Styled.ImagesListItem>
              ))}
            </Styled.ImagesList>
            {fields.length < 5 && (
              <Styled.AddButtonWrapper>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => append("")}
                >
                  +
                </Button>
              </Styled.AddButtonWrapper>
            )}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <Styled.BottomButtons>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Styled.BottomButtons>
          </Form>
        </div>
      </Styled.Wrapper>
    </Container>
  );
}

export default RegisterPage;
