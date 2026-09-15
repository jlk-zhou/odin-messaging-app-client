import { beforeEach, describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import SignUpFormComponent from ".";
import { renderComponent } from "#/tests/utils";

describe("Sign up form", () => {
  let signUpForm: HTMLFormElement;
  let nameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let confirmPasswordInput: HTMLInputElement;

  beforeEach(async () => {
    renderComponent(<SignUpFormComponent />);
    signUpForm = await screen.findByRole("form", {
      name: /sign up form/i,
    });
    nameInput = within(signUpForm).getByLabelText(/^name/i);
    emailInput = within(signUpForm).getByLabelText(/^email/i);
    usernameInput = within(signUpForm).getByLabelText(/^username/i);
    passwordInput = within(signUpForm).getByLabelText(/new password/i);
    confirmPasswordInput =
      within(signUpForm).getByLabelText(/^confirm password/i);
  });

  it("renders", () => {
    expect(signUpForm).toBeInTheDocument();
  });

  it("produces the correct data shape", async () => {
    const user = userEvent.setup();

    await user.type(nameInput, "Jane");
    await user.type(emailInput, "jane@example.com");
    await user.type(usernameInput, "jane123");
    await user.type(passwordInput, "SuperStrongPw123!");
    await user.type(confirmPasswordInput, "SuperStrongPw123!");

    expect(signUpForm).toHaveFormValues({
      name: "Jane",
      email: "jane@example.com",
      username: "jane123",
      newPassword: "SuperStrongPw123!",
      confirmPassword: "SuperStrongPw123!",
    });
  });

  describe("Name input", () => {
    it("exists", () => {
      expect(nameInput).toBeInTheDocument();
    });

    it("is of text type", () => {
      expect(nameInput).toHaveAttribute("type", "text");
    });

    it("allows entering input value", async () => {
      const user = userEvent.setup();
      await user.click(nameInput);
      expect(nameInput).toHaveFocus();
      await user.keyboard("Jessie Black");
      expect(nameInput).toHaveValue("Jessie Black");
    });

    it("has browser input validation", () => {
      expect(nameInput).toHaveAttribute(
        "minlength",
        expect.toSatisfy((val: string) => Number(val) >= 0),
      );
      expect(nameInput).toHaveAttribute(
        "maxlength",
        expect.toSatisfy((val: string) => Number(val) <= 50),
      );
    });

    it("becomes invalid and gives error for invalid inputs on touch", async () => {
      const user = await userEvent.setup();

      await user.click(nameInput);
      expect(nameInput).toHaveFocus();

      await user.click(document.body);
      expect(nameInput).not.toHaveFocus();
      expect(nameInput).toBeInvalid();
      expect(nameInput).toHaveAccessibleDescription(/name/i);

      await user.click(nameInput);
      await user.keyboard("Joseph");
      expect(nameInput).not.toBeInvalid();
      expect(nameInput).not.toHaveAccessibleDescription();
    });
  });

  describe("Email input", () => {
    it("exists", () => {
      expect(emailInput).toBeInTheDocument();
    });

    it("is of email type", () => {
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("allows entering input value", async () => {
      const user = userEvent.setup();
      await user.click(emailInput);
      expect(emailInput).toHaveFocus();
      await user.keyboard("jessie@example.com");
      expect(emailInput).toHaveValue("jessie@example.com");
    });

    it("has browser input validation", () => {
      expect(emailInput).toHaveAttribute(
        "minlength",
        expect.toSatisfy((val: string) => Number(val) >= 0),
      );
      expect(emailInput).toHaveAttribute(
        "maxlength",
        expect.toSatisfy((val: string) => Number(val) <= 50),
      );
    });

    it("becomes invalid and gives error for invalid inputs on touch", async () => {
      const user = await userEvent.setup();

      await user.click(emailInput);
      expect(emailInput).toHaveFocus();

      await user.click(document.body);
      expect(emailInput).not.toHaveFocus();
      expect(emailInput).toBeInvalid();
      expect(emailInput).toHaveAccessibleDescription(/email/i);

      await user.click(emailInput);
      await user.keyboard("someone");
      expect(emailInput).toBeInvalid();
      expect(emailInput).toHaveAccessibleDescription(/email/i);

      await user.keyboard("@example.com");
      expect(emailInput).not.toBeInvalid();
      expect(emailInput).not.toHaveAccessibleDescription();
    });
  });

  describe("Username input", () => {
    it("exists", () => {
      expect(usernameInput).toBeInTheDocument();
    });

    it("is of text type", () => {
      expect(usernameInput).toHaveAttribute("type", "text");
    });

    it("allows entering input value", async () => {
      const user = userEvent.setup();
      await user.click(usernameInput);
      expect(usernameInput).toHaveFocus();
      await user.keyboard("testing123");
      expect(usernameInput).toHaveValue("testing123");
    });

    it("has browser input validation", () => {
      expect(usernameInput).toHaveAttribute(
        "minlength",
        expect.toSatisfy((val: string) => Number(val) >= 0),
      );
      expect(usernameInput).toHaveAttribute(
        "maxlength",
        expect.toSatisfy((val: string) => Number(val) <= 50),
      );
    });

    it("becomes invalid and gives error for invalid inputs on touch", async () => {
      const user = await userEvent.setup();

      await user.click(usernameInput);
      expect(usernameInput).toHaveFocus();

      await user.click(document.body);
      expect(usernameInput).not.toHaveFocus();
      expect(usernameInput).toBeInvalid();
      expect(usernameInput).toHaveAccessibleDescription(/username/i);

      await user.click(usernameInput);
      await user.keyboard("joseph123");
      expect(usernameInput).not.toBeInvalid();
      expect(usernameInput).not.toHaveAccessibleDescription();
    });
  });

  describe("Password input", () => {
    it("exists", () => {
      expect(passwordInput).toBeInTheDocument();
    });

    it("becomes invalid for invalid passwords", async () => {
      const user = await userEvent.setup();

      await user.click(passwordInput);
      expect(passwordInput).toHaveFocus();

      await user.click(document.body);
      expect(passwordInput).not.toHaveFocus();
      expect(passwordInput).toBeInvalid();

      expect(passwordInput).toHaveAccessibleDescription(/password/i);

      await user.click(passwordInput);
      await user.keyboard("tight");
      expect(passwordInput).toBeInvalid();
      expect(passwordInput).toHaveAccessibleDescription(/password/i);

      await user.keyboard("Tight");
      expect(passwordInput).toBeInvalid();
      expect(passwordInput).toHaveAccessibleDescription(/password/i);

      await user.keyboard("TightYeah!123");
      expect(passwordInput).not.toBeInvalid();
      expect(passwordInput).not.toHaveAccessibleDescription();
    });
  });

  describe("Confirm password input", () => {
    it("exists", () => {
      expect(confirmPasswordInput).toBeInTheDocument();
    });

    it("becomes invalid when passwords do not match", async () => {
      const user = await userEvent.setup();

      await user.type(nameInput, "Tuco");
      await user.type(emailInput, "tuco@sal.bad");
      await user.type(usernameInput, "toxictuco");
      await user.type(passwordInput, "TightightightYeah!123");

      await user.click(confirmPasswordInput);
      expect(confirmPasswordInput).toHaveFocus();
      await user.click(document.body);
      expect(confirmPasswordInput).not.toHaveFocus();
      expect(confirmPasswordInput).toBeInvalid();
      expect(confirmPasswordInput).toHaveAccessibleDescription(/password/i);

      await user.click(confirmPasswordInput);
      await user.keyboard("Tightightight");
      expect(confirmPasswordInput).toBeInvalid();
      expect(confirmPasswordInput).toHaveAccessibleDescription(/match/i);

      await user.click(confirmPasswordInput);
      await user.keyboard("Yeah!123");
      expect(confirmPasswordInput).not.toBeInvalid();
      expect(confirmPasswordInput).not.toHaveAccessibleDescription();
    });
  });

  describe("Submit button", () => {
    let submitButton: HTMLButtonElement;
    beforeEach(async () => {
      submitButton = await screen.findByRole("button", { name: /sign up/i });
    });

    it("exists", () => {
      expect(submitButton).toBeInTheDocument();
    });
  });
});
