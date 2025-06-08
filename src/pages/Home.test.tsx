import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import Header from "@/components/todo/Header";

describe(Home, () => {
  test("ログアウトボタンがクリックされたときonSignoutを呼び出す", () => {
    const mockSignout = vi.fn();
    render(
      <Header
        currentUserName="Test User"
        onSignout={mockSignout}
        isDarkMode={false}
        setIsDarkMode={() => {}}
        isAllTodoList={true}
        isIncompleteTodoList={false}
        isCompleteTodoList={false}
        handleShowAllTodos={() => {}}
        handleShowIncompleteTodos={() => {}}
        handleShowCompleteTodos={() => {}}
      />
    );
    const logoutButton = screen.getByText("ログアウト");
    fireEvent.click(logoutButton);
    expect(mockSignout).toHaveBeenCalledTimes(1);
  });

  test("ローディング状態の表示", () => {
    render(<Home />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
