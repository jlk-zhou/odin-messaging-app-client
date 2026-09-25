import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";

import { emailSignInSchema, usernameSignInSchema } from "./schemas";
import { authClient } from "#/lib/auth-client";
import { useNotification } from "#/routes/components/Notification/store";

export default function useSignInForm() {
  const navigate = useNavigate({ from: "/sign-in" });
  const [formError, setFormError] = useState<false | string>(false);
  const setAlertOpen = useNotification((state) => state.setOpen);
  const setAlertMessage = useNotification((state) => state.setMessage);
  const setSeverity = useNotification((state) => state.setSeverity);

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
          navigate({ to: "/app" });
        },
        onError: (ctx) => {
          setSeverity("error");
          setAlertMessage(ctx.error.message);
          setAlertOpen(true);
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
          navigate({ to: "/app" });
        },
        onError: (ctx) => {
          setSeverity("error");
          setAlertMessage(ctx.error.message);
          setAlertOpen(true);
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
