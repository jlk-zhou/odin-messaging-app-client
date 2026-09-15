import { Controller } from "react-hook-form";
import * as _ from "lodash-es";
import TextField from "@mui/material/TextField";

import PasswordField from "#/routes/components/PasswordField";

interface AuthInputProps {
  className?: string;
  entry:
    | "name"
    | "email"
    | "username"
    | "newPassword"
    | "password"
    | "confirmPassword";
  form: any;
  required?: boolean;
}

export default function AuthField({
  className = "",
  entry,
  form,
  required = true,
}: AuthInputProps) {
  return (
    <Controller
      name={entry}
      control={form.control}
      render={({ field, fieldState }) => (
        <>
          {entry === "newPassword" ||
          entry === "password" ||
          entry === "confirmPassword" ? (
            <PasswordField
              {...field}
              fieldState={fieldState}
              className={`w-full ${className}`}
              isNew={entry === "newPassword" ? true : false}
              confirming={entry === "confirmPassword" ? true : false}
            />
          ) : (
            <TextField
              {...field}
              className={`w-full ${className}`}
              type={entry === "name" || entry === "username" ? "text" : "email"}
              required={required}
              label={_.capitalize(entry)}
              data-invalid={fieldState.invalid}
              error={fieldState.invalid}
              helperText={fieldState.invalid && fieldState.error?.message}
              slotProps={{
                htmlInput: {
                  minLength: entry === "email" ? 5 : 3,
                  maxLength: entry === "email" ? 50 : 30,
                  value: field.value,
                  "aria-invalid": fieldState.invalid,
                },
              }}
            />
          )}
        </>
      )}
    />
  );
}
