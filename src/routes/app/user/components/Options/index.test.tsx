import { beforeEach, describe, expect, it } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import Options from ".";
import userEvent from "@testing-library/user-event";

describe("User Details like email and bio", () => {
  beforeEach(() => {
    renderComponent(<Options username="testing" />);
  });

  it("renders the change password button", async () => {
    const changePasswordButton = await screen.findByRole("button", {
      name: /change password/i,
    });
    expect(changePasswordButton).toBeInTheDocument();
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

  it("allows closing confirmation dialog with button", async () => {
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
