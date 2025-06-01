import { IoIosClose } from "react-icons/io";
import { Checkbox } from "../ui/checkbox";

export default function IncompleteTodos() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-100 h-12 px-4 mx-auto rounded shadow">
        <div>
          <Checkbox className="bg-white" />
          <span className="pl-4 text-lg">未完了のTODO</span>
        </div>
        <IoIosClose className="text-3xl cursor-pointer" />
      </div>
      <div className="flex items-center justify-between bg-gray-100 h-12 px-4 mx-auto rounded shadow">
        <div>
          <Checkbox className="bg-white" />
          <span className="pl-4 text-lg">未完了のTODO</span>
        </div>
        <IoIosClose className="text-3xl cursor-pointer" />
      </div>
    </div>
  )
}
