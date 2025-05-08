"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { mockSkills } from "@/lib/mock-data";
import { Skill } from "@/lib/types";
import { SkillForm } from "@/components/skills/skill-form";

export default function EditSkillPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in or not a provider
    if (!user) {
      router.push("/auth/login");
      return;
    } else if (user.role !== "provider") {
      router.push("/dashboard/user");
      return;
    }

    // Get skill details
    const skillId = Array.isArray(id) ? id[0] : id;
    const foundSkill = mockSkills.find(s => s.id === skillId);
    
    if (!foundSkill || foundSkill.providerId !== user.id) {
      router.push("/dashboard/provider");
      return;
    }
    
    setSkill(foundSkill);
    setIsLoading(false);
  }, [id, user, router]);

  if (isLoading || !skill) {
    return <div className="container py-12">Loading...</div>;
  }

  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Edit Skill</h1>
      <SkillForm skill={skill} providerId={user.id} />
    </div>
  );
}