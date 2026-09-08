import { beforeEach, describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderComponent } from "#/tests/utils";
import MyInfoPage from ".";

const user = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "zachjoe@example.com",
  emailVerified: false,
  name: "Zach Joe",
  image: "example.png",
  username: "zachjoe2456",
  displayUsername: "zachjoe2456",
  bio: "Not your average gay",
};

describe("User Detailed Info Page", () => {
  beforeEach(() => {
    renderComponent(<MyInfoPage user={user} />);
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
