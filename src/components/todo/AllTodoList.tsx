import { IoIosClose } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";
import type { Todo } from "@/types/todo";

interface AllTodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export default function AllTodoList({ todos, onDelete }: AllTodoListProps) {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-100 h-12 px-4 mx-auto rounded shadow"
        >
          <div>
            <Checkbox className="bg-white" />
            <span className="pl-4 text-lg">{todo.content}</span>
          </div>
          <IoIosClose
            className="text-3xl cursor-pointer"
            onClick={() => onDelete(todo.id)}
          />
        </div>
      ))}
    </div>
  );
}
