import { useEffect, useId, useState } from "react";
import type { UseFormRegister } from "react-hook-form";

import {
  Label,
  ImageWrapper,
  RemoveButton,
  RemoveIcon,
} from "./ImageInput.styled";

type ImageInputProps = {
  image: File | null;
  register?: UseFormRegister<any>;
  registerName?: string;
  onRemove?: () => void;
  onChange?: (image: File | null) => void;
  error?: boolean;
};

function ImageInput(props: ImageInputProps) {
  const { image, register, registerName, onRemove, onChange, error } = props;

  const hintId = useId();
  const [objectURL, setObjectURL] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange !== "function") {
      return;
    }

    if (!e.target.files) {
      return onChange(null);
    }

    const file = e.target.files[0];
    if (!file) {
      return onChange(null);
    }
    onChange(file);
  };

  useEffect(() => {
    if (image) {
      setObjectURL(URL.createObjectURL(image));
    }

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [image]);

  return !!objectURL ? (
    <ImageWrapper>
      <img src={objectURL} />
      <RemoveButton variant="danger" type="button" onClick={onRemove}>
        <RemoveIcon />
      </RemoveButton>
    </ImageWrapper>
  ) : (
    <div style={{ width: "fit-content" }}>
      <Label htmlFor={hintId} $error={error}>
        <p>Select image</p>
      </Label>
      {!!register ? (
        <input
          type="file"
          accept="image/*"
          id={hintId}
          {...register(`${registerName}` as const, {
            required: true,
          })}
          onChange={onInputChange}
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          id={hintId}
          onChange={onInputChange}
        />
      )}
    </div>
  );
}

export default ImageInput;
