import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupFormProps {
  errors: { [key: string]: string };
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  signin: () => void;
}

export default function SigninForm({
  errors,
  setEmail,
  setPassword,
  signin,
}: SignupFormProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
            <div className="relative">
              <Input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="focus:border-none"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}
          </div>
          <Button type="submit" className="w-full" onClick={signin}>
            ログイン
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
