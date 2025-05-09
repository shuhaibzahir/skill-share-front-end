"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { TaskForm } from "@/components/tasks/task-form";

export default function NewTaskPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in or not a user
    if (!user) {
      router.push("/auth/login");
    } else if (user.data.role !== "user") {
      router.push("/dashboard/provider");
    }
  }, [user, router]);

  if (!user || user.data.role !== "user") {
    return null;
  }

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Create New Task</h1>
      <TaskForm userId={user.data.id} />
    </div>
  );
}