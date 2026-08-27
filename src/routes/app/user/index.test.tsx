import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderTestRouter } from "#/tests/utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock(import("../helpers/protectRoute"), () => ({
  default: vi.fn(),
}));

describe("User Details like email and bio", () => {
  beforeEach(() => {
    renderTestRouter("/app/user");
  });

  it("renders all information for a user", async () => {
    const image = await screen.findByAltText(/user avatar/i);
    const fullName = await screen.findByRole("heading", { name: /zach joe/i });
    const username = await screen.findByText(/@zachjoe2456/i);
    const email = await screen.findByText(/zachjoe@example.com/i);
    const bio = await screen.findByText(/not your average gay/i);

    expect(image).toBeInTheDocument();
    expect(fullName).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
  });
});
