import TodoSwitchButton from "@/components/todo/TodoSwitchButton";

export default function TodoSwitch({
  isAllTodoList,
  isIncompleteTodoList,
  isCompleteTodoList,
  onShowAllTodos,
  onShowIncompleteTodos,
  onShowCompleteTodos,
}: {
  isAllTodoList: boolean;
  isIncompleteTodoList: boolean;
  isCompleteTodoList: boolean;
  onShowAllTodos: () => void;
  onShowIncompleteTodos: () => void;
  onShowCompleteTodos: () => void;
}) {
  return (
    <div className="flex justify-end gap-4 py-4">
      <TodoSwitchButton
        value="全て"
        width="w-16"
        isTodoList={isAllTodoList}
        onClickShowTodos={onShowAllTodos}
      />
      <TodoSwitchButton
        value="未完了のみ"
        width="w-26"
        isTodoList={isIncompleteTodoList}
        onClickShowTodos={onShowIncompleteTodos}
      />
      <TodoSwitchButton
        value="完了のみ"
        width="w-22"
        isTodoList={isCompleteTodoList}
        onClickShowTodos={onShowCompleteTodos}
      />
    </div>
  );
}
