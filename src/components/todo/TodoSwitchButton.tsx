import { Button } from "../ui/button";

interface TodoSwitchButtonProps {
  value: string;
  width: string;
  isTodoList: boolean;
  isDarkMode: boolean;
  onClickShowTodos: () => void;
}

export default function TodoSwitchButton({
  value,
  width,
  isTodoList,
  isDarkMode,
  onClickShowTodos,
}: TodoSwitchButtonProps) {
  return (
    <Button
      className={`${width} rounded-3xl px-4 py-2 transition-colors ${
        isDarkMode && isTodoList
          ? "bg-yellow-400 hover:bg-yellow-300 text-white"
          : isDarkMode && !isTodoList
          ? "bg-gray-700 hover:bg-gray-600 text-white"
          : !isDarkMode && isTodoList
          ? "bg-orange-500 hover:bg-orange-400 text-white"
          : "bg-white hover:bg-gray-100 text-black border"
      }`}
      onClick={onClickShowTodos}
    >
      {value}
    </Button>
  );
}
