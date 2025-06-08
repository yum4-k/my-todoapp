import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SigninForm from "./signinForm";

const renderSigninForm = (overrides = {}) => {
  const defaultProps = {
    setEmail: vi.fn(),
    setPassword: vi.fn(),
    signin: vi.fn(),
    errors: {},
  };

  return render(<SigninForm {...defaultProps} {...overrides} />, {
    wrapper: MemoryRouter,
  });
};

describe(SigninForm, () => {
  test("メールアドレス入力時にsetEmailが呼び出される", () => {
    const mockSetEmail = vi.fn();
    renderSigninForm({ setEmail: mockSetEmail });

    const emailInput = screen.getByLabelText("メールアドレス");
    fireEvent.change(emailInput, { target: { value: "dummy@example.com" } });

    expect(mockSetEmail).toHaveBeenCalledWith("dummy@example.com");
  });

  test("パスワード入力時にsetPasswordが呼び出される", () => {
    const mockSetPassword = vi.fn();
    renderSigninForm({ setPassword: mockSetPassword });

    const passwordInput = screen.getByLabelText("パスワード");
    fireEvent.change(passwordInput, { target: { value: "dummyPassword" } });

    expect(mockSetPassword).toHaveBeenCalledWith("dummyPassword");
  });

  test("エラーメッセージが正しく表示される", () => {
    const errors = {
      email: "メールアドレスを入力してください。",
      password: "パスワードを入力してください。",
      general: "ログインに失敗しました。",
    };
    renderSigninForm({ errors });

    expect(screen.getByText(errors.email)).toBeInTheDocument();
    expect(screen.getByText(errors.password)).toBeInTheDocument();
    expect(screen.getByText(errors.general)).toBeInTheDocument();
  });

  test("ログインボタンがクリックされたときsigninを呼び出す", () => {
    const mockSignin = vi.fn();
    renderSigninForm({ signin: mockSignin });

    const loginButton = screen.getByRole("button", { name: "ログイン" });
    fireEvent.click(loginButton);

    expect(mockSignin).toHaveBeenCalled();
  });

  test("ユーザー登録リンクが正しいパスに遷移する", () => {
    renderSigninForm();

    const signupLink = screen.getByText("こちら");
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
