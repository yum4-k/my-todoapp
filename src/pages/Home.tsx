import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import { todoRepository } from "@/modules/todo/todo.repository";
import type { Todo } from "@/types/todo";
import AllTodoList from "@/components/todo/TodoList";
import TodoSwitchButton from "@/components/todo/TodoSwitchButton";

export default function Home() {
  const currentUserStore = useCurrentUserStore();
  const currentUserName = currentUserStore.currentUser?.user_metadata.name;
  const userId = currentUserStore.currentUser?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [isAllTodoList, setIsAllTodoList] = useState(true);
  const [isCompleteTodoList, setIsCompleteTodoList] = useState(false);
  const [isIncompleteTodoList, setIsIncompleteTodoList] = useState(false);
  const [isShowTodoInput, setIsShowTodoInput] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto my-auto">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="font-bold text-3xl w-60">ToDo App</CardTitle>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <span className="line-clamp-1">{currentUserName}</span>
                <span className="whitespace-nowrap"> さん</span>
              </div>
              <Button onClick={signout}>ログアウト</Button>
            </div>
          </div>
          <div className="flex justify-end gap-4 py-4">
            <TodoSwitchButton
              value="全て"
              width="w-16"
              isTodoList={isAllTodoList}
              onClickShowTodos={handleShowAllTodos}
            />
            <TodoSwitchButton
              value="未完了のみ"
              width="w-26"
              isTodoList={isIncompleteTodoList}
              onClickShowTodos={handleShowIncompleteTodos}
            />
            <TodoSwitchButton
              value="完了のみ"
              width="w-22"
              isTodoList={isCompleteTodoList}
              onClickShowTodos={handleShowCompleteTodos}
            />
          </div>
        </CardHeader>
        <CardContent>
          <AllTodoList
            todos={
              isAllTodoList
                ? todos
                : isIncompleteTodoList
                ? incompleteTodos
                : completeTodos
            }
            onDelete={deleteTodo}
          />
          {!isShowTodoInput && (
            <div className="flex items-center justify-center my-4">
              <IoIosAdd
                className="text-4xl text-gray-300 cursor-pointer shadow"
                onClick={() => setIsShowTodoInput(!isShowTodoInput)}
              />
            </div>
          )}
          {isShowTodoInput && (
            <div className="flex items-center justify-between my-4">
              <Input
                type="text"
                className="wx-auto"
                onChange={(e) => setContent(e.target.value)}
              />
              <IoIosAdd
                className="text-4xl text-gray-300 cursor-pointer shadow ml-4"
                onClick={createTodo}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
