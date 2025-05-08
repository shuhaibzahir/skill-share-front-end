import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center py-12">
      <LoginForm />
    </div>
  );
}