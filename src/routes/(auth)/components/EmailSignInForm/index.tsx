import { Controller } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as _ from "lodash-es";

import PasswordField from "#/routes/components/PasswordField";

interface EmailSignInFormProps {
  className?: string;
  form: any;
  onSubmit: any;
}

export default function EmailSignInForm({
  className,
  form,
  onSubmit,
}: EmailSignInFormProps) {
  return (
    <form
      aria-label={"Email Sign In Form"}
      className={`flex h-fit flex-col items-center gap-5 ${className}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name={"email"}
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="email"
            label="Email"
            name="email"
            className="w-full"
            error={fieldState.invalid}
            helperText={fieldState.invalid && fieldState.error?.message}
            data-invalid={fieldState.invalid}
            slotProps={{
              htmlInput: {
                minLength: 5,
                maxLength: 50,
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
