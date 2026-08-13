import { renderTestRouter } from "#/tests/utils.js";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  renderTestRouter("/sign-in");
});

describe("Sign in page", () => {
  it("has a heading", async () => {
    const heading = await screen.findByRole("heading", {
      name: /sign(?:\s|-)in/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("can toggle via a tab between email and username log in", async () => {
    const user = await userEvent.setup();
    const emailTab = await screen.findByRole("tab", {
      name: /(?:with|by|via) email/i,
    });
    const usernameTab = await screen.findByRole("tab", {
      name: /(?:with|by|via) username/i,
    });

    await user.click(usernameTab);
    const usernameForm = await screen.findByRole("form", {
      name: /username sign(?:\s|-)in form/i,
    });
    expect(usernameForm).toBeInTheDocument();

    await user.click(emailTab);
    const emailForm = await screen.findByRole("form", {
      name: /email sign(?:\s|-)in form/i,
    });
    expect(emailForm).toBeInTheDocument();
  });

  describe("Sign up page redirect link", () => {
    let signUpLink: HTMLAnchorElement;
    beforeEach(async () => {
      signUpLink = await screen.findByRole("link", { name: /sign up/i });
    });

    it("exists", () => {
      expect(signUpLink).toBeInTheDocument();
    });

    it("redirects user to the sign up form", async () => {
      const user = userEvent.setup();
      await user.click(signUpLink);
      const signUpForm = await screen.getByRole("form", { name: /sign up/i });
      expect(signUpForm).toBeInTheDocument();
    });
  });
});
