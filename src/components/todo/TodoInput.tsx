import { IoIosAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";

export default function TodoInput({
  isShowTodoInput,
  content,
  setContent,
  onCreateTodo,
  toggleInput,
}: {
  isShowTodoInput: boolean;
  content: string;
  setContent: (value: string) => void;
  onCreateTodo: () => void;
  toggleInput: () => void;
}) {
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
            className="wx-auto"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <IoIosAdd
            className="text-4xl text-gray-300 cursor-pointer shadow ml-4"
            onClick={onCreateTodo}
          />
        </div>
      )}
    </>
  );
}
