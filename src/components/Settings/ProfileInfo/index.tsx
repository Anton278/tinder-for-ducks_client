import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import SectionTitle from "../SectionTitle";
import { useUser } from "stores/user";
import fileService from "services/file";
import ImageInput from "components/UI/ImageInput";
import AddImageInput from "components/business/AddImageInput";

import * as Styled from "./ProfileInfoSettings.styled";

type Inputs = {
  images: { image: string | File | null }[];
  description: string;
};

function ProfileInfoSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "images",
  });
  const user = useUser((state) => state.user);
  const isLoadingUser = useUser((state) => state.isLoading);
  const updateUser = useUser((state) => state.updateUser);

  const onSubmit: SubmitHandler<Inputs> = async ({ description, images }) => {
    try {
      const oldImages = images.filter(({ image }) => typeof image == "string");
      const newImages = images.filter(({ image }) => typeof image !== "string");
      const savedImages = await Promise.all(
        // @ts-ignore
        newImages.map((newImage) => fileService.save(newImage.image))
      );
      await updateUser({
        ...user,
        duck: {
          description,
          // @ts-ignore
          images: [
            ...oldImages.map((oldImage) => oldImage.image),
            ...savedImages.map((savedImage) => savedImage.name),
          ],
        },
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    user.duck.images.forEach((image, index) => {
      update(index, { image });
    });
  }, [isLoadingUser]);

  return (
    <section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SectionTitle>Profile Info</SectionTitle>
        <Styled.Images>
          {fields.map(({ image, id }, index) => (
            <div
              key={id}
              style={{ position: "relative", width: "fit-content" }}
            >
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
                onRemove={() => update(index, { image: null })}
                onChange={(image) => update(index, { image })}
                error={!!errors?.images?.[index]}
              />
            </div>
          ))}
          {fields.length < 5 && (
            <AddImageInput onClick={() => append({ image: null })} />
          )}
        </Styled.Images>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Duck description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("description", {
              required: true,
            })}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        </Form.Group>
        <Styled.SubmitBtnWrapper>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Styled.SubmitBtnWrapper>
      </Form>
    </section>
  );
}

export default ProfileInfoSettings;
