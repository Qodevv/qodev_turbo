import { LoginForm } from "../../components";
import { act, render, screen, userEvent } from "../common";

describe("LoginForm", () => {
  it("should render login form with two inputs", () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} submitLoading={false} />);

    expect(screen.getByTestId("auth-username")).toBeInTheDocument();
    expect(screen.getByTestId("auth-password")).toBeInTheDocument();
  });

  it("should login user", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} submitLoading={false} />);

    await act(async () => {
      await userEvent.type(screen.getByTestId("auth-username"), "username");
      await userEvent.type(screen.getByTestId("auth-password"), "password");
      await userEvent.click(screen.getByTestId("auth-submit-button"));
    });

    expect(onSubmit).toHaveBeenCalled();
  });

  it("should show mandatory inputs errors keys if inputs are empty", async () => {
    const onSubmit = jest.fn();
    render(<LoginForm onSubmit={onSubmit} submitLoading={false} />);

    await act(
      async () =>
        await userEvent.click(screen.getByTestId("auth-submit-button"))
    );

    expect(screen.getByText("username is required")).toBeInTheDocument();
    expect(screen.getByText("password is required")).toBeInTheDocument();
  });
});
