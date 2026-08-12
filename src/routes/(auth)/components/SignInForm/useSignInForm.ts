import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

import { emailSignInSchema, usernameSignInSchema } from "./schemas";
import { authClient } from "#/lib/auth-client";

export default function useSignInForm() {
  const navigate = useNavigate({ from: "/sign-in" });
  const [formError, setFormError] = useState<false | string>(false);
  const emailForm = useForm<z.infer<typeof emailSignInSchema>>({
    resolver: zodResolver(emailSignInSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onEmailFormSubmit(reqBody: z.infer<typeof emailSignInSchema>) {
    await authClient.signIn.email(
      {
        ...reqBody,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (ctx) => {
          setFormError(ctx.error.message);
        },
      },
    );
  }
  const usernameForm = useForm<z.infer<typeof usernameSignInSchema>>({
    resolver: zodResolver(usernameSignInSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onUsernameFormSubmit(
    reqBody: z.infer<typeof usernameSignInSchema>,
  ) {
    await authClient.signIn.username(
      {
        ...reqBody,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (ctx) => {
          setFormError(ctx.error.message);
        },
      },
    );
  }

  return {
    emailForm,
    usernameForm,
    onEmailFormSubmit,
    onUsernameFormSubmit,
    formError,
    setFormError,
  };
}
