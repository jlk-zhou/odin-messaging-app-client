import { useNavigate } from "@tanstack/react-router";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { authClient } from "@/lib/auth-client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import PasswordField from "#/routes/components/PasswordField";
import { signUpFormSchema } from "./schema";

interface SignUpFormProps {
  className?: string;
}

export default function SignUpForm({ className = "" }: SignUpFormProps) {
  const navigate = useNavigate({ from: "/sign-up" });
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(reqBody: z.infer<typeof signUpFormSchema>) {
    await authClient.signUp.email(
      {
        ...reqBody,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (ctx) => {
          console.log(ctx.error.message);
        },
      },
    );
  }

  return (
    <form
      aria-label="Sign Up Form"
      className={`flex h-fit flex-col items-center gap-5 ${className}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="text"
            label="Name"
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
        name="email"
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
                maxLength: 40,
                "aria-invalid": fieldState.invalid,
              },
            }}
          />
        )}
      />
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
            data-invalid={fieldState.invalid}
            error={fieldState.invalid}
            helperText={fieldState.invalid && fieldState.error?.message}
            slotProps={{
              htmlInput: {
                minLength: 3,
                maxLength: 30,
                value: field.value,
                "aria-invalid": fieldState.invalid,
              },
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            className="w-full"
            fieldState={fieldState}
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            className="w-full"
            confirming={true}
            fieldState={fieldState}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" className="w-fit">
        Sign Up
      </Button>
    </form>
  );
}
