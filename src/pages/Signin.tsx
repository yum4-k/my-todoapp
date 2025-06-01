import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";

import { authRepository } from "@/modules/auth/auth.repository";
import { signinSchema } from "@/validations/user";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import SigninForm from "@/components/auth/signinForm";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const currentUserStore = useCurrentUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await authRepository.getCurrentUser();
      currentUserStore.set(currentUser);
      setIsLoading(false);
    };
    fetchCurrentUser();
  }, [currentUserStore]);

  const signin = async () => {
    try {
      const validatedData = signinSchema.parse({
        email,
        password,
      });
      const user = await authRepository.signin(
        validatedData.email,
        validatedData.password
      );
      currentUserStore.set(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        setErrors({
          general: "メールアドレスまたはパスワードが正しくありません。",
        });
      }
    }
  };

  if (isLoading) return <div />;

  if (currentUserStore.currentUser !== undefined)
    return <Navigate replace to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SigninForm
        setEmail={setEmail}
        setPassword={setPassword}
        signin={signin}
        errors={errors}
      />
    </div>
  );
}
