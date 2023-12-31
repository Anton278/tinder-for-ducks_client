import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import SectionTitle from "../SectionTitle";
import { useUser } from "stores/user";
import fileService from "services/file";

import * as Styled from "./ProfileInfoSettings.styled";

type Inputs = {
  images: { value: string | FileList }[];
  description: string;
};

function ProfileInfoSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });
  const [imagesCopy, setImagesCopy] = useState<string[]>([]);
  const user = useUser((state) => state.user);
  const isLoadingUser = useUser((state) => state.isLoading);
  const updateUser = useUser((state) => state.updateUser);

  const onSubmit: SubmitHandler<Inputs> = async ({ description, images }) => {
    try {
      // @ts-ignore
      const notEmptyImages: { value: FileList }[] = images.filter(
        ({ value }) => value.length
      );
      const savedImages = await Promise.all(
        notEmptyImages.map(({ value }) => fileService.save(value[0]))
      );
      await updateUser({
        ...user,
        duck: {
          description,
          images: [
            ...imagesCopy,
            ...savedImages.map((savedImage) => savedImage.name),
          ],
        },
      });
    } catch (err) {
    } finally {
    }
  };

  const removeImage = (index: number) => {
    setImagesCopy(imagesCopy.filter((_, imgIndex) => imgIndex !== index));
  };

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    setImagesCopy(user.duck.images);
  }, [isLoadingUser]);

  useEffect(() => {
    remove();
    Array.from(Array(5 - imagesCopy.length)).forEach(() =>
      append({ value: "" })
    );
  }, [imagesCopy.length]);

  console.log("errors ", errors);

  return (
    <section>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SectionTitle>Profile Info</SectionTitle>
        <Styled.Images>
          {imagesCopy.map((image, index) => (
            <Styled.ImageWrapper key={image}>
              <Styled.ImageDeleteButton
                type="button"
                onClick={() => removeImage(index)}
              >
                X
              </Styled.ImageDeleteButton>
              <img src={image} alt={"Profile"} />
            </Styled.ImageWrapper>
          ))}
          {fields.map(({ id }, index) => (
            <Styled.ImgInpWrapper key={id}>
              <input
                type="file"
                accept="image/*"
                {...register(`images.${index}.value` as const, {
                  required: index === 0 && !imagesCopy.length,
                })}
              />
            </Styled.ImgInpWrapper>
          ))}
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
