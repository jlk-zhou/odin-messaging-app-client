import { beforeEach, describe, expect, it } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import DangerZone from ".";
import DeleteWarning from "./DeleteWarning";

import userEvent from "@testing-library/user-event";

describe("Danger zone in user info page", () => {
  beforeEach(() => {
    renderComponent(<DangerZone username={"zachjoe"} />);
  });

  it("renders the danger zone heading", async () => {
    const dangerZoneHeading = await screen.findByRole("heading", {
      name: /danger zone\!/i,
    });
    expect(dangerZoneHeading).toBeInTheDocument();
  });

  it("renders the delete account button", async () => {
    const deleteAccountButton = await screen.findByRole("button", {
      name: /delete account/i,
    });
    expect(deleteAccountButton).toBeInTheDocument();
  });

  it("pops up a dialog after user clicks delete button", async () => {
    const user = userEvent.setup();
    const deleteAccountButton = await screen.findByRole("button", {
      name: /delete account/i,
    });
    await user.click(deleteAccountButton);
    const DeleteDialogHeading = await screen.findByRole("heading", {
      name: /delete/i,
    });
    expect(DeleteDialogHeading).toBeInTheDocument();
  });

  it("allows the dialog to be closed by button", async () => {
    const user = userEvent.setup();
    const deleteAccountButton = await screen.findByRole("button", {
      name: /delete account/i,
    });
    await user.click(deleteAccountButton);
    const closeDialogButton = await screen.findByRole("button", {
      name: /no/i,
    });
    await user.click(closeDialogButton);
    const DeleteDialogHeading = screen.queryByRole("heading", {
      name: /delete/i,
    });
    await waitFor(() => {
      expect(DeleteDialogHeading).not.toBeInTheDocument();
    });
  });
});

describe("Delete warning dialog", () => {
  beforeEach(() => {
    let isOpen = true;
    renderComponent(
      <DeleteWarning
        open={isOpen}
        username={"zachjoe"}
        setDialogState={() => (isOpen = false)}
      />,
    );
  });

  it("has a close button", async () => {
    const cancelButton = await screen.findByRole("button", { name: /no/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("has a confirm button", async () => {
    const confirmButton = await screen.findByRole("button", { name: /yes/i });
    expect(confirmButton).toBeInTheDocument();
  });

  it("has a form for user to input their password for deleting account", async () => {
    const passwordInput = await screen.findByLabelText(/password/i, {
      selector: "input",
    });
    expect(passwordInput).toBeInTheDocument();
  });

  it("validates password input on touch", async () => {
    const user = userEvent.setup();

    // Select the password input and type a password
    const passwordInput = await screen.findByLabelText(/password/i, {
      selector: "input",
    });
    await user.type(passwordInput, "VerySecurePassword");

    // Unfocus the input
    await user.tab();
    expect(passwordInput).not.toHaveFocus();

    // Focus back and delete some characters
    await user.click(passwordInput);
    expect(passwordInput).toHaveFocus();
    for (let i = 0; i < 12; i++) {
      await user.keyboard("[Backspace]");
    }

    // The password should now be too short thus making input invalid
    expect(passwordInput).toBeInvalid();

    // And shows an error message
    expect(passwordInput).toHaveAccessibleDescription(/password/i);
  });
});
