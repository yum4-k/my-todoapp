import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();
  const currentUserName = currentUserStore.currentUser?.user_metadata.name;

  const setSession = useCallback(async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  }, [currentUserStore]);

  const signout = async () => {
    await authRepository.signout();
    currentUserStore.set(undefined);
  };

  useEffect(() => {
    setSession();
  }, [setSession]);

  if (currentUserStore.currentUser === undefined)
    return <Navigate replace to="/signin" />;

  if (isLoading) return <div />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="font-bold text-3xl">ToDo App</CardTitle>
            <div className="flex items-center justify-between gap-4">
              <span>{currentUserName} さん</span>
              <Button onClick={signout}>ログアウト</Button>
            </div>
          </div>
          <div className="flex justify-end gap-4 py-4">
            <Button className="rounded-3xl bg-orange-500 hover:bg-orange-400">
              全て
            </Button>
            <Button className="rounded-3xl" variant="outline">
              未完了のみ
            </Button>
            <Button className="rounded-3xl" variant="outline">
              完了のみ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-100 h-12 px-4 mx-auto rounded">
              <div>
                <Checkbox className="bg-white" />
                <span className="pl-4 text-lg">洗濯物をする</span>
              </div>
              <IoIosClose className="text-3xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-between bg-gray-100 h-12 px-4 mx-auto rounded">
              <div>
                <Checkbox className="bg-white" />
                <span className="pl-4 text-lg">買い物にいく</span>
              </div>
              <IoIosClose className="text-3xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-center px-3 h-12">
              <IoIosAdd className="text-4xl text-gray-300 cursor-pointer" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
