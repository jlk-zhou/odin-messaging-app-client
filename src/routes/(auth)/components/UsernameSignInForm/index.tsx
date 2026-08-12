import { Controller } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as _ from "lodash-es";

import PasswordField from "#/routes/components/PasswordField";

interface UsernameSignInFormProps {
  className?: string;
  form: any;
  onSubmit: any;
}

export default function usernameSignInForm({
  className,
  form,
  onSubmit,
}: UsernameSignInFormProps) {
  return (
    <form
      aria-label={"Username Sign In Form"}
      className={`flex h-fit flex-col items-center gap-5 ${className}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="text"
            label="Username"
            name="username"
            className="w-full"
            error={fieldState.invalid}
            helperText={fieldState.invalid && fieldState.error?.message}
            data-invalid={fieldState.invalid}
            slotProps={{
              htmlInput: {
                minLength: 3,
                maxLength: 30,
                "aria-invalid": fieldState.invalid,
              },
            }}
          />
        )}
      />
      <Controller
        name={"password"}
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            className="w-full"
            fieldState={fieldState}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" className="w-fit">
        Sign In
      </Button>
    </form>
  );
}
