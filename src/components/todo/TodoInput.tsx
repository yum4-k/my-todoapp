import { IoIosAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";

interface TodoInputProps {
  isDarkMode: boolean;
  isShowTodoInput: boolean;
  content: string;
  setContent: (value: string) => void;
  onCreateTodo: () => void;
  toggleInput: () => void;
}

export default function TodoInput({
  isDarkMode,
  isShowTodoInput,
  content,
  setContent,
  onCreateTodo,
  toggleInput,
}: TodoInputProps) {
  return (
    <>
      {!isShowTodoInput && (
        <div className="flex items-center justify-center my-4">
          <IoIosAdd
            className="text-4xl text-gray-300 cursor-pointer shadow"
            onClick={toggleInput}
          />
        </div>
      )}
      {isShowTodoInput && (
        <div className="flex items-center justify-between my-4">
          <Input
            type="text"
            className={`wx-auto ${
              isDarkMode && "bg-gray-700 border-gray-600 text-white"
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <IoIosAdd
            data-testid="todo-create-icon"
            className="text-4xl text-gray-300 cursor-pointer shadow ml-4"
            onClick={() => {
              if (content.trim() === "") return;
              onCreateTodo();
            }}
          />
        </div>
      )}
    </>
  );
}
