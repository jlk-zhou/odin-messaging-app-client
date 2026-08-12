import { beforeEach, describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import EmailSignInComponent from ".";
import { renderComponent } from "#/tests/file-route-utils";

describe("Email sign in form", () => {
  let emailSignInForm: HTMLFormElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  beforeEach(async () => {
    renderComponent(<EmailSignInComponent />);

    emailSignInForm = await screen.findByRole("form", {
      name: /email sign(?:\s|-)in form/i,
    });
    emailInput = within(emailSignInForm).getByLabelText(/^email/i, {
      selector: "input",
    });
    passwordInput = within(emailSignInForm).getByLabelText(/^password/i, {
      selector: "input",
    });
  });

  it("produces the correct data shape", async () => {
    const user = userEvent.setup();

    await user.type(emailInput, "myname@example.com");
    await user.type(passwordInput, "VeryStrongPw123!");

    expect(emailSignInForm).toHaveFormValues({
      email: "myname@example.com",
      password: "VeryStrongPw123!",
    });
  });

  describe("Email Input", () => {
    it("exists", () => {
      expect(emailInput).toBeInTheDocument();
    });

    it("is of type email", () => {
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("allows entering input value", async () => {
      const user = userEvent.setup();
      await user.click(emailInput);
      expect(emailInput).toHaveFocus();
      await user.keyboard("myname@example.com");
      expect(emailInput).toHaveValue("myname@example.com");
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
      await user.keyboard("TightYeah!123");
      expect(passwordInput).not.toBeInvalid();
      expect(passwordInput).not.toHaveAccessibleDescription();
    });
  });

  describe("Submit button", () => {
    let submitButton: HTMLButtonElement;
    beforeEach(() => {
      submitButton = within(emailSignInForm).getByRole("button", {
        name: /sign(?:\s|-)in/i,
      });
    });

    it("exists", () => {
      expect(submitButton).toBeInTheDocument();
    });
  });
});
