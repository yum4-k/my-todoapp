import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Label } from "../ui/label";
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
        id="dark-mode"
        defaultChecked={isDarkMode}
        onCheckedChange={() => setIsDarkMode(!isDarkMode)}
        className="scale-200 ml-4 h-[18px]"
      />
      {!isDarkMode && (<Label htmlFor="dark-mode" className="text-lg absolute left-9.5">
        <MdDarkMode />
      </Label>)}
      {isDarkMode && (<Label htmlFor="dark-mode" className="text-lg absolute left-2">
        <MdLightMode className="text-white"/>
      </Label>)}
    </div>
  );
}
