import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { OutlinedInputProps } from "@mui/material";
import type { ControllerFieldState } from "react-hook-form";

interface PasswordFieldProps extends OutlinedInputProps {
  className?: string;
  isNew?: boolean;
  confirming?: boolean;
  fieldState?: ControllerFieldState | undefined;
}

export default function PasswordField({
  className = "",
  isNew = false,
  confirming = false,
  fieldState = undefined,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const label = isNew
    ? "New Password"
    : confirming
      ? "Confirm Password"
      : "Password";
  const id = isNew
    ? "new-password"
    : confirming
      ? "confirm-password"
      : "password";
  const helperTextId = `${id}-error`;
  const name = isNew
    ? "newPassword"
    : confirming
      ? "confirmPassword"
      : "password";

  return (
    <FormControl
      variant="outlined"
      className={className}
      error={fieldState?.invalid}
      data-invalid={fieldState?.invalid}
    >
      <InputLabel htmlFor={id} required>
        {label}
      </InputLabel>
      <OutlinedInput
        {...props}
        aria-invalid={fieldState?.invalid}
        slotProps={{
          input: {
            minLength: 8,
            maxLength: 32,
            "aria-describedby": helperTextId,
          },
        }}
        required
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        label={`${label}`}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? "hide password" : "show password"}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {fieldState?.invalid && (
        <FormHelperText id={helperTextId}>
          {fieldState.error?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
