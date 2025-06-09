import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TodoList from "./TodoList";

const mockTodos = [
  {
    content: "Test Todo 1",
    created_at: "",
    id: 1,
    is_completed: false,
    updated_at: "",
    user_id: "12AB",
  },
  {
    content: "Test Todo 2",
    created_at: "",
    id: 2,
    is_completed: true,
    updated_at: "",
    user_id: "34CD",
  },
];

describe("TodoList", () => {
  test("checkboxを押した時にtodoのis_completedが変わる", () => {
    const mockOnUpdate = vi.fn();
    render(
      <TodoList
        todos={mockTodos}
        isDarkMode={false}
        onDelete={() => {}}
        onUpdate={mockOnUpdate}
      />
    );

    const checkbox = screen.getAllByTestId("todo-checkbox")[0];
    fireEvent.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledWith(1, { is_completed: true });
  });

  test("todoの編集が可能", () => {
    const mockOnUpdate = vi.fn();
    render(
      <TodoList
        todos={mockTodos}
        isDarkMode={false}
        onDelete={() => {}}
        onUpdate={mockOnUpdate}
      />
    );

    const editButton = screen.getAllByTestId("update-icon")[0];
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Test Todo 1");
    fireEvent.change(input, { target: { value: "Updated Todo 1" } });
    fireEvent.blur(input);

    expect(mockOnUpdate).toHaveBeenCalledWith(1, { content: "Updated Todo 1" });
  });

  test("IoIosCloseアイコンを押した時にonDeleteが発火する", () => {
    const mockOnDelete = vi.fn();
    render(
      <TodoList
        todos={mockTodos}
        isDarkMode={false}
        onDelete={mockOnDelete}
        onUpdate={() => {}}
      />
    );

    const deleteButton = screen.getAllByTestId("delete-icon")[0];
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
