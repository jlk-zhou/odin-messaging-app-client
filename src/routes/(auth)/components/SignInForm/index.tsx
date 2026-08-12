import { Controller } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as _ from "lodash-es";

import PasswordField from "#/routes/components/PasswordField";

interface SignInFormProps {
  className?: string;
  mode: "email" | "username";
  form: any;
  onSubmit: any;
}

export default function SignInForm({
  className,
  mode,
  form,
  onSubmit,
}: SignInFormProps) {
  return (
    <form
      aria-label={`${_.capitalize(mode)} Sign In Form`}
      className={`flex h-fit flex-col items-center gap-5 ${className}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name={mode}
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type={mode === "email" ? "email" : "text"}
            label={_.capitalize(mode)}
            name={mode}
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
      <Button
        loading={form.formState.isSubmitting}
        type="submit"
        variant="contained"
        className={`w-30`}
      >
        Sign In
      </Button>
    </form>
  );
}
