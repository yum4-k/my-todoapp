import { useState } from "react";
import { Navigate } from "react-router-dom";
import { z } from "zod";

import { authRepository } from "@/modules/auth/auth.repository";
import { signupSchema } from "@/validations/user";
import { useCurrentUserStore } from "@/modules/auth/auth.store";
import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const currentUserStore = useCurrentUserStore();

  const signup = async () => {
    try {
      const validatedData = signupSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });
      const user = await authRepository.signup(
        validatedData.name,
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
      }
    }
  };

  if (currentUserStore.currentUser !== undefined) return <Navigate replace to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SignupForm
        errors={errors}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setShowPassword={setShowPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        signup={signup}
      />
    </div>
  );
}
