"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Skill } from "@/lib/types";
import { ClockIcon, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface SkillCardProps {
  skill: Skill;
  isProvider?: boolean;
  onClick?: () => void;
}

export function SkillCard({ skill, isProvider = true, onClick }: SkillCardProps) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{skill.category}</CardTitle>
          <Badge variant="outline">{skill.workType}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span>{skill.experience} years experience</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <DollarSign className="h-4 w-4" />
            <span>{formatCurrency(skill.hourlyRate, 'USD')}/hour</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isProvider ? (
          <Link href={`/dashboard/provider/skills/${skill.id}`} className="w-full">
            <Button className="w-full" variant="outline">
              Edit
            </Button>
          </Link>
        ) : (
          <Button onClick={onClick} className="w-full">
            View Available Tasks
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}