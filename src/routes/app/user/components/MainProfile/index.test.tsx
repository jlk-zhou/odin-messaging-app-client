import { renderComponent } from "#/tests/utils";
import { beforeEach, describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import MainProfile from ".";

describe("Self user info page", () => {
  beforeEach(() => {
    renderComponent(<MainProfile />);
  });

  it("renders user's avatar image", async () => {
    const avatar = await screen.findByRole("img", { name: /avatar/i });
    expect(avatar).toBeInTheDocument();
  });

  it("renders an edit button for avatar image", async () => {
    const editAvatarButton = await screen.findByRole("button", {
      name: /edit avatar/i,
    });
    expect(editAvatarButton).toBeInTheDocument();
  });

  it("renders user's full name", async () => {
    const fullName = await screen.findByRole("heading", { name: /zach joe/i });
    expect(fullName).toBeInTheDocument();
  });

  it("renders an edit button for user's full name", async () => {
    const fullNameEditButton = await screen.findByRole("button", {
      name: /edit full.*name/i,
    });
    expect(fullNameEditButton).toBeInTheDocument();
  });

  it("renders user's username", async () => {
    const username = await screen.findByText(/^\@zachjoe2456/i);
    expect(username).toBeInTheDocument();
  });

  it("renders an edit button for user's full name", async () => {
    const usernameEditButton = await screen.findByRole("button", {
      name: /edit username/i,
    });
    expect(usernameEditButton).toBeInTheDocument();
  });
});
