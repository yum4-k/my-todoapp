import TodoSwitchButton from "@/components/todo/TodoSwitchButton";

interface TodoSwitchProps {
  isDarkMode: boolean;
  isAllTodoList: boolean;
  isIncompleteTodoList: boolean;
  isCompleteTodoList: boolean;
  onShowAllTodos: () => void;
  onShowIncompleteTodos: () => void;
  onShowCompleteTodos: () => void;
}

export default function TodoSwitch({
  isDarkMode,
  isAllTodoList,
  isIncompleteTodoList,
  isCompleteTodoList,
  onShowAllTodos,
  onShowIncompleteTodos,
  onShowCompleteTodos,
}: TodoSwitchProps) {
  return (
    <div className="flex justify-end gap-4 py-4">
      <TodoSwitchButton
        value="全て"
        width="w-16"
        isDarkMode={isDarkMode}
        isTodoList={isAllTodoList}
        onClickShowTodos={onShowAllTodos}
      />
      <TodoSwitchButton
        value="未完了のみ"
        width="w-26"
        isDarkMode={isDarkMode}
        isTodoList={isIncompleteTodoList}
        onClickShowTodos={onShowIncompleteTodos}
      />
      <TodoSwitchButton
        value="完了のみ"
        width="w-22"
        isDarkMode={isDarkMode}
        isTodoList={isCompleteTodoList}
        onClickShowTodos={onShowCompleteTodos}
      />
    </div>
  );
}
