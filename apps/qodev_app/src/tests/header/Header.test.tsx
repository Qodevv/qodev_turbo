import { ComponentProps } from "react";

import { Header } from "../../components";
import { render, screen } from "../common";

const DEFAULT_PROPS: ComponentProps<typeof Header> = {
  menu: [],
  onLogout: jest.fn(),
  useRawLogoUrl: false,
};

jest.mock("../../core/router", () => ({
  useRouter: jest
    .fn()
    .mockReturnValue({ asPath: "", events: { on: jest.fn(), off: jest.fn() } }),
}));

describe("Header", () => {
  it("should render the header correctly", () => {
    render(<Header {...DEFAULT_PROPS} />);
    expect(screen.getByTestId("app-bar-header")).toBeInTheDocument();
  });
});
