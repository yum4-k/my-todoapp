import { Button } from "@/components/ui/button";
import { CardTitle } from "../ui/card";

export default function Header({
  currentUserName,
  onSignout,
}: {
  currentUserName: string;
  onSignout: () => void;
}) {
  return (
    <div className="flex justify-between">
      <CardTitle className="font-bold text-3xl mr-auto">ToDo App</CardTitle>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="line-clamp-1">{currentUserName}</span>
          <span className="whitespace-nowrap"> さん</span>
        </div>
        <Button onClick={onSignout}>ログアウト</Button>
      </div>
    </div>
  );
}
