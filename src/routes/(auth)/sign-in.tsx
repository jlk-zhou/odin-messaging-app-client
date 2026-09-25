import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Route as signUpRoute } from "./sign-up";

import * as _ from "lodash-es";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import AuthFormContainer from "./components/AuthFormContainer";
import SignInForm from "./components/SignInForm";
import TabPanel from "./components/TabPanel";
import useSignInForm from "./components/SignInForm/useSignInForm";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignIn,
  notFoundComponent: () => <h1>Not Found! Geez just stop yelling</h1>,
});

function SignIn() {
  const {
    emailForm,
    usernameForm,
    onEmailFormSubmit,
    onUsernameFormSubmit,
    setFormError,
  } = useSignInForm();

  // For tabs
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    emailForm.reset();
    usernameForm.reset();
    setFormError(false);
    setValue(newValue);
  };

  return (
    <AuthFormContainer>
      <h1 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
        Sign In
      </h1>

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
        <SignInForm
          form={emailForm}
          mode={"email"}
          onSubmit={onEmailFormSubmit}
          className="w-full"
        />
      </TabPanel>
      <TabPanel className="w-full" value={value} index={1}>
        <SignInForm
          form={usernameForm}
          mode={"username"}
          onSubmit={onUsernameFormSubmit}
          className="w-full"
        />
      </TabPanel>
      <p className="mt-12 text-center">
        Don't have an account?{" "}
        <Link className="text-sky-600 hover:underline" to={signUpRoute.to}>
          Sign Up
        </Link>
      </p>
    </AuthFormContainer>
  );
}
