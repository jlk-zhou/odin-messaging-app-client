import { beforeEach, describe, expect, it } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import DangerZone from ".";

describe("User Details like email and bio", () => {
  beforeEach(() => {
    renderComponent(<DangerZone />);
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
});
