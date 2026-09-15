import { beforeEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import PasswordFieldComponent from "./index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderComponent } from "#/tests/utils";
import * as z from "zod";
import {
  confirmPasswordSchema,
  existingPasswordSchema,
  newPasswordSchema,
} from "#/routes/util/userFieldSchemas";

describe("Password Field Component", () => {
  let passwordField: HTMLInputElement;
  beforeEach(async () => {
    render(<PasswordFieldComponent />);
    passwordField = await screen.findByLabelText(/^password/i);
  });

  it("conceals the password by default", () => {
    expect(passwordField).toHaveAttribute("type", "password");
  });

  it("allows password to reveal and hide on toggle", async () => {
    const user = userEvent.setup();
    const toggleOnButton = screen.getByRole("button", {
      name: /show password/i,
    });
    await user.click(toggleOnButton);
    expect(passwordField).toHaveAttribute("type", "text");
    const toggleOffButton = screen.getByRole("button", {
      name: /hide password/i,
    });
    await user.click(toggleOffButton);
    expect(passwordField).toHaveAttribute("type", "password");
  });

  it("allows entering input value", async () => {
    const user = userEvent.setup();
    await user.click(passwordField);
    expect(passwordField).toHaveFocus();
    await user.keyboard("VerySecurePw!123");
    expect(passwordField).toHaveValue("VerySecurePw!123");
  });

  it("has browser input validation", () => {
    expect(passwordField).toHaveAttribute(
      "minlength",
      expect.toSatisfy((val: string) => Number(val) >= 0),
    );
    expect(passwordField).toHaveAttribute(
      "maxlength",
      expect.toSatisfy((val: string) => Number(val) <= 50),
    );
  });
});

describe("Confirm Password Field Component", () => {
  let confirmPasswordField: HTMLInputElement;
  const confirmPasswordRegex = /^(?=.*confirm)(?=.*password).*$/i;

  beforeEach(async () => {
    render(<PasswordFieldComponent confirming={true} />);
    confirmPasswordField = await screen.findByLabelText(confirmPasswordRegex);
  });

  it("renders as confirm password field", () => {
    expect(confirmPasswordField.getAttribute("id")).toMatch(
      confirmPasswordRegex,
    );
    expect(confirmPasswordField.getAttribute("name")).toMatch(
      confirmPasswordRegex,
    );
  });
});

describe("Password Field Input Validation UI", () => {
  const formSchema = z
    .object({
      password: existingPasswordSchema,
      newPassword: newPasswordSchema,
      confirmPassword: confirmPasswordSchema,
    })
    .refine(
      (data) => {
        return data.newPassword === data.confirmPassword;
      },
      {
        path: ["confirmPassword"],
        message: "Passwords must match.",
      },
    );
});
