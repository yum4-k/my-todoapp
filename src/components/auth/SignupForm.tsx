import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

interface SignupFormProps {
  errors: { [key: string]: string };
  showPassword: boolean;
  showConfirmPassword: boolean;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setShowPassword: (value: boolean) => void;
  setShowConfirmPassword: (value: boolean) => void;
  signup: () => void;
}

export default function SignupForm({
  errors,
  showPassword,
  showConfirmPassword,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  signup,
}: SignupFormProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>ユーザー登録</CardTitle>
          <span className="text-sm">
            登録済みの方は
            <Link to="/signin" className="border-b border-black">
              こちら
            </Link>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">名前</Label>
            <Input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              className="focus:border-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <div className="relative flex items-center">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="focus:border-none"
              />
              {!showPassword && (
                <IoMdEye
                  className="absolute right-5 text-2xl text-gray-300"
                  onClick={() => setShowPassword(true)}
                />
              )}
              {showPassword && (
                <IoMdEyeOff
                  className="absolute right-5 text-2xl text-gray-600"
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">パスワード(確認用)</Label>
            <div className="relative flex items-center">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:border-none"
              />
              {!showConfirmPassword && (
                <IoMdEye
                  className="absolute right-5 text-2xl text-gray-300"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
              {showConfirmPassword && (
                <IoMdEyeOff
                  className="absolute right-5 text-2xl text-gray-600"
                  onClick={() => setShowConfirmPassword(false)}
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" className="w-full" onClick={signup}>
            登録
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
