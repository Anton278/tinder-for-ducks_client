import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import type { FormControlProps } from "react-bootstrap/esm/FormControl";
import { useState, forwardRef } from "react";
import Button from "react-bootstrap/Button";

import EyeSlash from "../Icons/EyeSlash";
import Eye from "../Icons/Eye";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FormControlProps & { error?: string };

const Input = forwardRef(({ type, error, ...otherProps }: InputProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  switch (type) {
    case "password":
      return (
        <div>
          <InputGroup>
            <Form.Control
              ref={ref}
              type={showPassword ? "text" : "password"}
              isInvalid={!!error}
              {...otherProps}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </Button>
            {error && (
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </div>
      );
    default:
      <Form.Control type={type} {...otherProps} ref={ref} />;
  }
});

export default Input;
