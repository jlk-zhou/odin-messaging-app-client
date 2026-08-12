import { useNavigate } from "@tanstack/react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { authClient } from "#/lib/auth-client";
import { signUpFormSchema } from "./schema";
import AuthInput from "../AuthInput";

interface SignUpFormProps {
  className?: string;
}

type Entry = "name" | "email" | "username" | "password" | "confirmPassword";

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
          switch (true) {
            case /username/i.test(ctx.error.code):
              form.setError("username", ctx.error);
              break;
            case /email/i.test(ctx.error.code):
              form.setError("email", ctx.error);
              break;
            default:
              form.setError("root.serverError", ctx.error);
              break;
          }
        },
      },
    );
  }
  const error = form.formState.errors.root?.serverError;

  const entries: Entry[] = [
    "name",
    "email",
    "username",
    "password",
    "confirmPassword",
  ];

  return (
    <form
      aria-label="Sign Up Form"
      className={`flex h-fit flex-col items-center gap-5 ${className}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {error && <Alert severity="error">{error.message}</Alert>}
      {entries.map((entry) => (
        <AuthInput entry={entry} form={form} />
      ))}
      <Button
        loading={form.formState.isSubmitting}
        type="submit"
        variant="contained"
        className="w-30"
      >
        Sign Up{" "}
      </Button>
    </form>
  );
}
