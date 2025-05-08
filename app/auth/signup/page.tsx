import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] items-center justify-center py-12">
      <SignupForm />
    </div>
  );
}