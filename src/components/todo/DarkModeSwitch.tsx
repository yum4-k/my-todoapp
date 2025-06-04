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
    <div className="flex items-center gap-5 ">
      <Switch
        id="dark-mode"
        defaultChecked={isDarkMode}
        onCheckedChange={() => setIsDarkMode(!isDarkMode)}
        className="scale-150 ml-3"
      />
      <Label htmlFor="dark-mode" className="text-xl">
        {isDarkMode ? <MdDarkMode /> : <MdLightMode />}
      </Label>
    </div>
  );
}
