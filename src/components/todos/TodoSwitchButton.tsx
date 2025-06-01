import { Button } from "../ui/button";

interface TodoSwitchButtonProps {
  value: string;
  width: string;
  isTodoList: boolean;
  onClickShowTodos: () => void;
}

export default function TodoSwitchButton({
  value,
  width,
  isTodoList,
  onClickShowTodos,
}: TodoSwitchButtonProps) {
  return (
    <Button
      className={`${width} rounded-3xl px-4 py-2 transition-colors ${
        isTodoList
          ? "bg-orange-500 hover:bg-orange-400 text-white"
          : "bg-white hover:bg-gray-100 text-black"
      }`}
      variant={isTodoList ? undefined : "outline"}
      onClick={onClickShowTodos}
    >
      {value}
    </Button>
  );
}
