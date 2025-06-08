import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SignupForm from "./SignupForm";

const renderSignupForm = (overrides = {}) => {
  const defaultProps = {
    setName: vi.fn(),
    setEmail: vi.fn(),
    setPassword: vi.fn(),
    setConfirmPassword: vi.fn(),
    setShowPassword: vi.fn(),
    setShowConfirmPassword: vi.fn(),
    signup: vi.fn(),
    errors: {},
    showPassword: false,
    showConfirmPassword: false,
  };

  return render(<SignupForm {...defaultProps} {...overrides} />, {
    wrapper: MemoryRouter,
  });
};

describe("SignupForm", () => {
  test("名前入力時にsetNameが呼び出される", () => {
    const mockSetName = vi.fn();
    renderSignupForm({ setName: mockSetName });

    const nameInput = screen.getByLabelText("名前");
    fireEvent.change(nameInput, { target: { value: "Test" } });

    expect(mockSetName).toHaveBeenCalledWith("Test");
  });

  test("メールアドレス入力時にsetEmailが呼び出される", () => {
    const mockSetEmail = vi.fn();
    renderSignupForm({ setEmail: mockSetEmail });

    const emailInput = screen.getByLabelText("メールアドレス");
    fireEvent.change(emailInput, { target: { value: "dummy@example.com" } });

    expect(mockSetEmail).toHaveBeenCalledWith("dummy@example.com");
  });

  test("パスワードと確認用パスワード入力時に対応する関数が呼び出される", () => {
    const mockSetPassword = vi.fn();
    const mockSetConfirmPassword = vi.fn();
    renderSignupForm({
      setPassword: mockSetPassword,
      setConfirmPassword: mockSetConfirmPassword,
    });

    const passwordInput = screen.getByLabelText("パスワード");
    fireEvent.change(passwordInput, { target: { value: "dummyPassword" } });
    expect(mockSetPassword).toHaveBeenCalledWith("dummyPassword");

    const confirmPasswordInput = screen.getByLabelText("パスワード(確認用)");
    fireEvent.change(confirmPasswordInput, {
      target: { value: "dummyPassword" },
    });
    expect(mockSetConfirmPassword).toHaveBeenCalledWith("dummyPassword");
  });

  test("エラーメッセージが正しく表示される", () => {
    const errors = {
      name: "名前を入力してください。",
      email: "メールアドレスを入力してください。",
      password: "パスワードを入力してください。",
      confirmPassword: "パスワード(確認用)を入力してください。",
    };
    renderSignupForm({ errors });
    expect(screen.getByText(errors.name)).toBeInTheDocument();
    expect(screen.getByText(errors.email)).toBeInTheDocument();
    expect(screen.getByText(errors.password)).toBeInTheDocument();
    expect(screen.getByText(errors.confirmPassword)).toBeInTheDocument();
  });

  test("パスワード表示切り替えが動作する", () => {
    const mockSetShowPassword = vi.fn();
    renderSignupForm({ setShowPassword: mockSetShowPassword });

    const eyeIcon = screen.getByTestId("show-password-icon");
    fireEvent.click(eyeIcon);

    expect(mockSetShowPassword).toHaveBeenCalledWith(true);
  });

  test("登録ボタンがクリックされたときsignupが呼び出される", () => {
    const mockSignup = vi.fn();
    renderSignupForm({ signup: mockSignup });

    const signupButton = screen.getByRole("button", { name: "登録" });
    fireEvent.click(signupButton);

    expect(mockSignup).toHaveBeenCalled();
  });

  test("リンクが正しいパスに遷移する", () => {
    renderSignupForm();

    const signinLink = screen.getByText("こちら");
    expect(signinLink).toHaveAttribute("href", "/signin");
  });
});
