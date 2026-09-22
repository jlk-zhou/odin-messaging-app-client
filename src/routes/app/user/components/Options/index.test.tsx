import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Options from ".";
import userEvent from "@testing-library/user-event";

describe("Change password option", () => {
  beforeEach(async () => {
    renderComponent(
      <Options
        username="testing"
        setAlertOpen={vi.fn()}
        setAlertMessage={vi.fn()}
      />,
    );
    const user = await userEvent.setup();
    const changePasswordButton = await screen.findByRole("button", {
      name: /change password/i,
    });
    await user.click(changePasswordButton);
  });

  it("pops up a dialog after user clicks change password button", async () => {
    const changePasswordHeading = await screen.findByRole("heading", {
      name: /changing password/i,
    });
    expect(changePasswordHeading).toBeInTheDocument();
  });

  it("has a confirm changing password button in the pop-up dialog", async () => {
    const confirmChangeButton = await screen.findByRole("button", {
      name: /change password/i,
    });
    expect(confirmChangeButton).toBeInTheDocument();
  });

  it("has an input field for entering old password", async () => {
    const currentPasswordInput = await screen.findByLabelText(/^password/i, {
      selector: "input",
    });
    expect(currentPasswordInput).toBeInTheDocument();
  });

  it("has an input field for entering new password", async () => {
    const newPasswordInput = await screen.findByLabelText(/new password/i, {
      selector: "input",
    });
    expect(newPasswordInput).toBeInTheDocument();
  });

  it("has an input field for confirming the new password", async () => {
    const confirmNewPasswordInput = await screen.findByLabelText(
      /confirm password/i,
      { selector: "input" },
    );
    expect(confirmNewPasswordInput).toBeInTheDocument();
  });

  it("allows closing change password dialog form by clicking button", async () => {
    const user = await userEvent.setup();
    const closeButton = await screen.findByRole("button", {
      name: /cancel/i,
    });
    await user.click(closeButton);
    const changePasswordHeading = await screen.queryByRole("heading", {
      name: /changing password/i,
    });
    await waitFor(() => {
      expect(changePasswordHeading).not.toBeInTheDocument();
    });
  });

  it("clears the change password form once the dialog is closed", async () => {
    const user = await userEvent.setup();
    const currentPasswordInput = await screen.findByLabelText(/^password/i, {
      selector: "input",
    });
    const newPasswordInput = await screen.findByLabelText(/new password/i, {
      selector: "input",
    });
    const confirmNewPasswordInput = await screen.findByLabelText(
      /confirm password/i,
      { selector: "input" },
    );

    await user.type(currentPasswordInput, "Qwe123456");
    await user.type(newPasswordInput, "654321ewQ");
    await user.type(confirmNewPasswordInput, "654321ewQ");

    const closeButton = await screen.findByRole("button", {
      name: /cancel/i,
    });
    await user.click(closeButton);

    const changePasswordButton = await screen.findByRole("button", {
      name: /change password/i,
    });
    await user.click(changePasswordButton);

    expect(currentPasswordInput).toHaveValue("");
    expect(newPasswordInput).toHaveValue("");
    expect(confirmNewPasswordInput).toHaveValue("");
  });
});

describe("Log out option", () => {
  beforeEach(() => {
    renderComponent(
      <Options
        setAlertOpen={vi.fn()}
        setAlertMessage={vi.fn()}
        username={"testing"}
      />,
    );
  });
  it("renders the log out button", async () => {
    const logOutButton = await screen.findByRole("button", {
      name: /log out/i,
    });
    expect(logOutButton).toBeInTheDocument();
  });

  it("pops up a confirmation dialog after log out button is clicked", async () => {
    const user = userEvent.setup();
    const logOutButton = await screen.findByRole("button", {
      name: /log out/i,
    });
    await user.click(logOutButton);
    const confirmationDialog = await screen.findByRole("heading", {
      name: /log out from.*\?/i,
    });
    expect(confirmationDialog).toBeInTheDocument();
  });

  it("allows closing log out confirmation dialog with button", async () => {
    const user = userEvent.setup();
    const logOutButton = await screen.findByRole("button", {
      name: /log out/i,
    });
    await user.click(logOutButton);
    const confirmationDialog = await screen.findByRole("heading", {
      name: /log out from.*\?/i,
    });
    const closeButton = await screen.findByRole("button", {
      name: /cancel/i,
    });
    await user.click(closeButton);
    await waitFor(() => {
      expect(confirmationDialog).not.toBeInTheDocument();
    });
  });
});
