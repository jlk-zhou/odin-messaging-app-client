import { beforeEach, describe, expect, it } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen } from "@testing-library/react";
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
});

describe("Delete warning dialog", () => {
  beforeEach(() => {
    renderComponent(<DeleteWarning open={true} username={"zachjoe"} />);
  });

  it("has a close button", async () => {});
});
