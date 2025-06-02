import { IoIosClose } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";
import type { Todo } from "@/types/todo";
import { useState } from "react";

interface AllTodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export default function AllTodoList({ todos, onDelete }: AllTodoListProps) {
  const [contentWrapState, setContentWrapState] = useState<
    Record<number, boolean>
  >({});

  const toggleContentWrap = (id: number) => {
    setContentWrapState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow"
        >
          <div>
            <Checkbox className="bg-white mr-4" />
          </div>
          <div
            className={`flex-1 text-left ${
              contentWrapState[todo.id] ? "" : "line-clamp-1"
            }`}
            onClick={() => toggleContentWrap(todo.id)}
          >
            <p className="text-lg">{todo.content}</p>
          </div>
          <div>
            <IoIosClose
              className="text-3xl cursor-pointer"
              onClick={() => onDelete(todo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
