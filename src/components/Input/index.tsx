import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { FormControlProps } from "react-bootstrap/esm/FormControl";
import { useState } from "react";
import Button from "react-bootstrap/Button";

import EyeSlash from "../Icons/EyeSlash";
import Eye from "../Icons/Eye";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FormControlProps & {
    label?: string;
  };

function Input({ type, label, ...otherProps }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  switch (type) {
    case "password":
      return (
        <InputGroup>
          <Form.Control
            type={showPassword ? "text" : "password"}
            {...otherProps}
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeSlash /> : <Eye />}
          </Button>
        </InputGroup>
      );
    default:
      <Form.Control type={type} {...otherProps} />;
  }
}

export default Input;
