import { Box, AddCircle, AddIcon } from "./AddImageInput.styled";

type AddImageInputProps = {
  onClick?: () => void;
};

function AddImageInput({ onClick }: AddImageInputProps) {
  return (
    <Box>
      <AddCircle variant="warning" type="button" onClick={onClick}>
        <AddIcon />
      </AddCircle>
    </Box>
  );
}

export default AddImageInput;
