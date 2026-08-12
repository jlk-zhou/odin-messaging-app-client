import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Route as signUpRoute } from "./sign-up";

import * as _ from "lodash-es";

import Alert from "@mui/material/Alert";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import AuthFormContainer from "./components/AuthFormContainer";
import EmailSignInForm from "./components/EmailSignInForm";
import UsernameSignInForm from "./components/UsernameSignInForm";
import TabPanel from "./components/TabPanel";
import { useForm } from "react-hook-form";
import { emailSignInSchema } from "./components/EmailSignInForm/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { authClient } from "#/lib/auth-client";
import { usernameSignInSchema } from "./components/UsernameSignInForm/schema";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignIn,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
});

function SignIn() {
  // For sign in form hooks
  // All these below can be further organized into its own hook
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

  // For tabs
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    emailForm.reset();
    usernameForm.reset();
    setFormError(false);
    setValue(newValue);
  };

  return (
    <AuthFormContainer>
      <h1 className="mb-6 text-center text-2xl font-bold md:text-3xl">
        Sign In
      </h1>
      {formError && <Alert severity="error">{formError}</Alert>}

      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className="w-full py-3"
      >
        <Tab label="With Email" />
        <Tab label="With Username" />
      </Tabs>
      <TabPanel className="w-full" value={value} index={0}>
        <EmailSignInForm
          form={emailForm}
          onSubmit={onEmailFormSubmit}
          className="w-full md:min-w-90"
        />
      </TabPanel>
      <TabPanel className="w-full" value={value} index={1}>
        <UsernameSignInForm
          form={usernameForm}
          onSubmit={onUsernameFormSubmit}
          className="w-full md:min-w-90"
        />
      </TabPanel>
      <p className="mt-12 text-center">
        Don't have an account?{" "}
        <Link className="hover:underline" to={signUpRoute.to}>
          Sign Up
        </Link>
      </p>
    </AuthFormContainer>
  );
}
