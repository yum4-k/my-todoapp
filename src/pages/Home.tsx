import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import AllTodoList from "@/components/todos/AllTodoList";
import IncompleteTodos from "@/components/todos/IncompleteTodoList";
import CompleteTodos from "@/components/todos/CompleteTodoList";
import TodoSwitchButton from "@/components/todos/TodoSwitchButton";
import { Input } from "@/components/ui/input";

export default function Home() {
  const currentUserStore = useCurrentUserStore();
  const currentUserName = currentUserStore.currentUser?.user_metadata.name;
  const [isLoading, setIsLoading] = useState(true);
  const [isAllTodoList, setIsAllTodoList] = useState(true);
  const [isCompleteTodoList, setIsCompleteTodoList] = useState(false);
  const [isIncompleteTodoList, setIsIncompleteTodoList] = useState(false);
  const [isShowTodoInput, setIsShowTodoInput] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await authRepository.getCurrentUser();
      currentUserStore.set(currentUser);
      setIsLoading(false);
    };
    fetchCurrentUser();
  }, [currentUserStore]);

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
      <Card className="w-full max-w-lg mx-auto h-120">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="font-bold text-3xl">ToDo App</CardTitle>
            <div className="flex items-center justify-between gap-4">
              <span>{currentUserName} さん</span>
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
          {isAllTodoList && <AllTodoList />}
          {isIncompleteTodoList && <IncompleteTodos />}
          {isCompleteTodoList && <CompleteTodos />}
          {isAllTodoList && (
            <>
              <div className="flex items-center justify-center h-12 my-3">
                {!isShowTodoInput && (
                  <IoIosAdd
                    className="text-4xl text-gray-300 cursor-pointer shadow"
                    onClick={() => setIsShowTodoInput(!isShowTodoInput)}
                  />
                )}
              </div>
              {isShowTodoInput && (
                <div className="flex items-center justify-between">
                  <Input type="text" className="w-100" />
                  <IoIosAdd
                    className="text-4xl text-gray-300 cursor-pointer shadow"
                    onClick={() => setIsShowTodoInput(false)}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
