import { useNavigate } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as _ from "lodash-es";

import { usernameSignInSchema } from "./schema";
import PasswordField from "#/routes/components/PasswordField";

interface UsernameSignInFormProps {
  className?: string;
}

export default function usernameSignInForm({
  className,
}: UsernameSignInFormProps) {
  const navigate = useNavigate({ from: "/sign-in" });
  const form = useForm<z.infer<typeof usernameSignInSchema>>({
    resolver: zodResolver(usernameSignInSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(reqBody: z.infer<typeof usernameSignInSchema>) {
    await authClient.signIn.username(
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
