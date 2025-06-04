import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { IoIosClose } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";

import type { Todo } from "@/types/todo";

interface AllTodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    todo: { content?: string; is_completed?: boolean }
  ) => void;
}

export default function AllTodoList({
  todos,
  onDelete,
  onUpdate,
}: AllTodoListProps) {
  const [contentWrapState, setContentWrapState] = useState<
    Record<number, boolean>
  >({});
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const toggleContentWrap = (id: number) => {
    setContentWrapState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleEditStart = (id: number, content: string) => {
    setEditingTodoId(id);
    setEditedContent(content);
  };

  const handleEditEnd = (id: number) => {
    if (editedContent.trim() !== "") {
      onUpdate(id, { content: editedContent });
    }
    setEditingTodoId(null);
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded shadow"
        >
          <div>
            <Checkbox
              className="bg-white mr-4"
              checked={todo.is_completed}
              onCheckedChange={() => {
                onUpdate(todo.id, {
                  is_completed: !todo.is_completed,
                });
              }}
            />
          </div>
          <div
            className={`flex-1 text-left ${
              contentWrapState[todo.id] ? "" : "line-clamp-1"
            }`}
            onClick={() => toggleContentWrap(todo.id)}
          >
            {editingTodoId === todo.id ? (
              <Input
                type="text"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                onBlur={() => handleEditEnd(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditEnd(todo.id);
                }}
                className="text-lg mr-4 border-none 
                focus-visible:ring-muted shadow-none"
              />
            ) : (
              <p className="text-lg mr-4">{todo.content}</p>
            )}
          </div>
          <div className="flex items-center justify-between cursor-pointer gap-2">
            <BiSolidPencil
              onClick={() => handleEditStart(todo.id, todo.content)}
            />
            <IoIosClose
              className="text-3xl"
              onClick={() => onDelete(todo.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
