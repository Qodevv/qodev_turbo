import { ComponentProps, ReactNode } from "react";
import { Card } from "@repo/ui";

import { render, screen } from "../common";
import { Button, Typography } from "@mui/material";

const DEFAULT_PROPS: ComponentProps<typeof Card> = {
  hasActionButtons: true,
  element: null,
  elevation: 5,
  children: null,
};

describe("Card", () => {
  it("should render the card correctly", () => {
    render(<Card {...DEFAULT_PROPS} />);
    expect(screen.getByTestId("Reusable-Card")).toBeInTheDocument();
  });

  it("renders action with button", () => {
    render(
      <Card
        hasActionButtons={true}
        element={<Button data-testid="button">Click Me</Button>}
      />
    );
    expect(screen.getByTestId("Action-Button")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });

  it("renders with custom elevation", () => {
    render(<Card elevation={10} />);

    const cardElement = screen.getByTestId("Reusable-Card");
    expect(window.getComputedStyle(cardElement).boxShadow).toBe(
      "rgba(0, 0, 0, 0.12) 0px 2px 10px 0px"
    );
  });

  it("renders with children", () => {
    render(
      <Card>
        <Typography>Testing</Typography>
      </Card>
    );
    expect(screen.getByText("Testing")).toBeInTheDocument();
  });
});
