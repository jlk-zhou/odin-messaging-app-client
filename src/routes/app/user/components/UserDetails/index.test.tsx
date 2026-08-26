import { beforeEach, describe, expect, it } from "vitest";
import { renderComponent } from "#/tests/utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import UserDetails from ".";

describe("User Details like email and bio", () => {
  beforeEach(() => {
    renderComponent(<UserDetails />);
  });

  it("renders the email section title", async () => {
    const emailTitle = await screen.findByRole("heading", { name: /email/i });
    expect(emailTitle).toBeInTheDocument();
  });

  it("renders the actual user email", async () => {
    const email = await screen.findByText(/zachjoe\@example.com/i);
    expect(email).toBeInTheDocument();
  });

  it("renders a button for user to edit email", async () => {
    const emailEditButton = await screen.findByRole("button", {
      name: /edit email/i,
    });
    expect(emailEditButton).toBeInTheDocument();
  });

  it("renders the bio section title", async () => {
    const bioTitle = await screen.findByRole("heading", { name: /bio/i });
    expect(bioTitle).toBeInTheDocument();
  });

  it("renders the actual user bio", async () => {
    const bio = await screen.findByText(/not your average gay/i);
    expect(bio).toBeInTheDocument();
  });

  it("renders a button for user to edit bio", async () => {
    const bioEditButton = await screen.findByRole("button", {
      name: /edit bio/i,
    });
    expect(bioEditButton).toBeInTheDocument();
  });
});
