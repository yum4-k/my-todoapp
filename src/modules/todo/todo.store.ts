import type { Todo } from "@/types/todo";
import { atom, useAtom } from "jotai";

const todoAtom = atom<Todo[]>([]);

export const useTodoStore = () => {
  const [todos, setTodos] = useAtom(todoAtom);

  const set = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return { todos, set };
};
