import { Button } from "@/components/ui/button";
import { CardTitle } from "../ui/card";
import DarkModeSwitch from "./DarkModeSwitch";
import TodoSwitch from "./TodoSwitch";

interface HeaderProps {
  currentUserName: string;
  onSignout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isAllTodoList: boolean;
  isIncompleteTodoList: boolean;
  isCompleteTodoList: boolean;
  handleShowAllTodos: () => void;
  handleShowIncompleteTodos: () => void;
  handleShowCompleteTodos: () => void;
}

export default function Header({
  currentUserName,
  onSignout,
  isDarkMode,
  setIsDarkMode,
  isAllTodoList,
  isIncompleteTodoList,
  isCompleteTodoList,
  handleShowAllTodos,
  handleShowIncompleteTodos,
  handleShowCompleteTodos,
}: HeaderProps) {
  return (
    <>
      <div className="flex justify-between">
        <CardTitle
          className={`font-bold text-3xl mr-auto ${isDarkMode && "text-white"}`}
        >
          ToDo App
        </CardTitle>
        <div className="flex items-center justify-between gap-4">
          <div className={`flex items-center ${isDarkMode && "text-white"}`}>
            <span className="line-clamp-1">{currentUserName}</span>
            <span className="whitespace-nowrap"> さん</span>
          </div>
          <Button
            onClick={onSignout}
            className={
              isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "none"
            }
          >
            ログアウト
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <DarkModeSwitch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <TodoSwitch
          isDarkMode={isDarkMode}
          isAllTodoList={isAllTodoList}
          isIncompleteTodoList={isIncompleteTodoList}
          isCompleteTodoList={isCompleteTodoList}
          onShowAllTodos={handleShowAllTodos}
          onShowIncompleteTodos={handleShowIncompleteTodos}
          onShowCompleteTodos={handleShowCompleteTodos}
        />
      </div>
    </>
  );
}
