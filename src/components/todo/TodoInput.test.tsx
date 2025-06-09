import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TodoInput from "./TodoInput";

describe("TodoInput", () => {
  test("IoIosAddアイコンをクリックしたときにonCreateTodoが発火する", () => {
    const mockOnCreateTodo = vi.fn();
    const mockToggleInput = vi.fn();

    render(
      <TodoInput
        isDarkMode={false}
        isShowTodoInput={true}
        content="Test Todo"
        setContent={() => {}}
        onCreateTodo={mockOnCreateTodo}
        toggleInput={mockToggleInput}
      />
    );

    const addButton = screen.getByTestId("todo-create-icon");
    fireEvent.click(addButton);

    expect(mockOnCreateTodo).toHaveBeenCalledTimes(1);
  });

  test("contentが空の場合、onCreateTodoが発火しない", () => {
    const mockOnCreateTodo = vi.fn();
    const mockToggleInput = vi.fn();

    render(
      <TodoInput
        isDarkMode={false}
        isShowTodoInput={true}
        content=""
        setContent={() => {}}
        onCreateTodo={mockOnCreateTodo}
        toggleInput={mockToggleInput}
      />
    );

    const addButton = screen.getByTestId("todo-create-icon");
    fireEvent.click(addButton);

    expect(mockOnCreateTodo).not.toHaveBeenCalled();
  });
});
