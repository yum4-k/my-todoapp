import { IoIosClose } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import { todoRepository } from "@/modules/todo/todo.repository";
import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import { useTodoStore } from "@/modules/todo/todo.store";

export default function AllTodoList() {
  const { currentUser } = useCurrentUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const { todos } = useTodoStore();

  useEffect(() => {
    const fecthAllTodos = async () => {
      if (!currentUser?.id) return;
      const allTodos = await todoRepository.find(currentUser.id);
      if (!allTodos) return;
      setAllTodos(allTodos);
      setIsLoading(false);
    };
    fecthAllTodos();
  }, [todos, currentUser?.id]);

  if (isLoading) return <div />;

  return (
    <div className="space-y-4">
      {allTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-100 h-12 px-4 mx-auto rounded shadow"
        >
          <div>
            <Checkbox className="bg-white" />
            <span className="pl-4 text-lg">{todo.content}</span>
          </div>
          <IoIosClose className="text-3xl cursor-pointer" />
        </div>
      ))}
    </div>
  );
}
