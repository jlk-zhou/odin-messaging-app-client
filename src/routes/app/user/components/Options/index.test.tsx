import { beforeEach, describe, expect, it } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Options from ".";

describe("User Details like email and bio", () => {
  beforeEach(() => {
    renderComponent(<Options />);
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
});
