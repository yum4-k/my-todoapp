import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import { todoRepository } from "@/modules/todo/todo.repository";
import type { Todo } from "@/types/todo";
import Header from "@/components/todo/Header";
import TodoSwitch from "@/components/todo/TodoSwitch";
import TodoList from "@/components/todo/TodoList";
import TodoInput from "@/components/todo/TodoInput";
import DarkModeSwitch from "@/components/todo/DarkModeSwitch";

export default function Home() {
  const currentUserStore = useCurrentUserStore();
  const currentUserName = currentUserStore.currentUser?.user_metadata.name;
  const userId = currentUserStore.currentUser?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [isAllTodoList, setIsAllTodoList] = useState(true);
  const [isCompleteTodoList, setIsCompleteTodoList] = useState(false);
  const [isIncompleteTodoList, setIsIncompleteTodoList] = useState(false);
  const [isShowTodoInput, setIsShowTodoInput] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const incompleteTodos = todos.filter((todo) => todo.is_completed === false);
  const completeTodos = todos.filter((todo) => todo.is_completed === true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await authRepository.getCurrentUser();
      currentUserStore.set(currentUser);
      setIsLoading(false);
    };
    fetchCurrentUser();
  }, [currentUserStore]);

  useEffect(() => {
    const fecthAllTodos = async () => {
      if (!userId) return;
      const allTodos = await todoRepository.find(userId);
      if (!allTodos) return;
      setTodos(allTodos);
      setIsLoading(false);
    };
    fecthAllTodos();
  }, [userId]);

  const createTodo = async () => {
    if (!userId) return;
    if (content === "") return;
    const newTodo = await todoRepository.create(userId, content);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsShowTodoInput(false);
    setContent("");
  };

  const updateTodo = async (
    id: number,
    todo: { content?: string; is_completed?: boolean }
  ) => {
    const updatedTodo = await todoRepository.update(id, todo);
    setTodos((prevTodos) => {
      const combieTodos = [...prevTodos, updatedTodo];
      const uniqueTodos: { [key: number]: Todo } = {};
      for (const todo of combieTodos) {
        uniqueTodos[todo.id] = todo;
      }
      return Object.values(uniqueTodos);
    });
  };

  const deleteTodo = async (id: number) => {
    await todoRepository.delete(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const signout = async () => {
    await authRepository.signout();
    currentUserStore.set(undefined);
  };

  const handleShowAllTodos = () => {
    setIsAllTodoList(true);
    setIsCompleteTodoList(false);
    setIsIncompleteTodoList(false);
  };

  const handleShowCompleteTodos = () => {
    setIsCompleteTodoList(true);
    setIsAllTodoList(false);
    setIsIncompleteTodoList(false);
  };

  const handleShowIncompleteTodos = () => {
    setIsIncompleteTodoList(true);
    setIsAllTodoList(false);
    setIsCompleteTodoList(false);
  };

  if (!isLoading && currentUserStore.currentUser === undefined) {
    return <Navigate replace to="/signin" />;
  }

  if (isLoading) return <div />;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        isDarkMode && "bg-gray-950"
      }`}
    >
      <Card
        className={`w-full max-w-lg mx-auto my-auto ${
          isDarkMode && "bg-gray-900 border-gray-800"
        }`}
      >
        <CardHeader>
          <Header currentUserName={currentUserName} onSignout={signout} />
          <div className="flex items-center justify-between">
            <DarkModeSwitch
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
            <TodoSwitch
              isAllTodoList={isAllTodoList}
              isIncompleteTodoList={isIncompleteTodoList}
              isCompleteTodoList={isCompleteTodoList}
              onShowAllTodos={handleShowAllTodos}
              onShowIncompleteTodos={handleShowIncompleteTodos}
              onShowCompleteTodos={handleShowCompleteTodos}
            />
          </div>
        </CardHeader>
        <CardContent>
          <TodoList
            todos={
              isAllTodoList
                ? todos
                : isIncompleteTodoList
                ? incompleteTodos
                : completeTodos
            }
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
          <TodoInput
            isShowTodoInput={isShowTodoInput}
            content={content}
            setContent={setContent}
            onCreateTodo={createTodo}
            toggleInput={() => setIsShowTodoInput(!isShowTodoInput)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
