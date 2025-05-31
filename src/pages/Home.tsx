import { Button } from "@/components/ui/button";
import { authRepository } from "@/modules/auth/auth.repository";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Home() {
  const currentUserStore = useCurrentUserStore();
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      Home
      <div>
        <Button onClick={signout}>ログアウト</Button>
      </div>
    </div>
  );
}
