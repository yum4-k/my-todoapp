import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Switch } from "../ui/switch";

interface DarkModeSwitchProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function DarkModeSwitch({
  isDarkMode,
  setIsDarkMode,
}: DarkModeSwitchProps) {
  return (
    <div className="flex items-center relative">
      <Switch
        defaultChecked={isDarkMode}
        onCheckedChange={() => setIsDarkMode(!isDarkMode)}
        className="scale-200 ml-4 h-[18px]"
      />
      {!isDarkMode && (<div className="text-lg absolute left-9.5">
        <MdDarkMode />
      </div>)}
      {isDarkMode && (<div className="text-lg absolute left-2">
        <MdLightMode className="text-white"/>
      </div>)}
    </div>
  );
}
