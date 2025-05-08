"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { SkillForm } from "@/components/skills/skill-form";

export default function NewSkillPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in or not a provider
    if (!user) {
      router.push("/auth/login");
    } else if (user.role !== "provider") {
      router.push("/dashboard/user");
    }
  }, [user, router]);

  if (!user || user.role !== "provider") {
    return null;
  }

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Add New Skill</h1>
      <SkillForm providerId={user.id} />
    </div>
  );
}