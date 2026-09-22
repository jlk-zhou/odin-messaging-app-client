import { renderComponent } from "#/tests/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Notification from ".";
import { screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Notification Bar", () => {
  beforeEach(() => {
    renderComponent(
      <Notification open={true} setOpen={vi.fn()} message="Success!" />,
    );
  });

  it("displays the notification message", async () => {
    const alert = await screen.findByRole("alert");
    const alertText = within(alert).getByText(/success/i);
    expect(alertText).toBeInTheDocument();
  });
});
