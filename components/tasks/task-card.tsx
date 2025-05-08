"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Task } from "@/lib/types";
import { CalendarIcon, ClockIcon, DollarSign } from "lucide-react";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
  isProvider?: boolean;
  hasOffered?: boolean;
  onClick?: () => void;
}

export function TaskCard({ task, isProvider = false, hasOffered = false, onClick }: TaskCardProps) {
  const statusColors = {
    'open': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'completed': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{task.name}</CardTitle>
          <Badge className={statusColors[task.status]}>
            {task.status === 'in-progress' ? 'In Progress' : 
             task.status === 'completed' ? 'Completed' : 'Open'}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Badge variant="outline">{task.category}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {task.description}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(task.startDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span>{task.workingHours} hours</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm font-medium">
          <DollarSign className="h-4 w-4" />
          <span>{formatCurrency(task.hourlyRate, task.currency)}/hour</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {isProvider ? (
          <Button 
            onClick={onClick} 
            className="w-full"
            variant={hasOffered ? "outline" : "default"}
            disabled={task.status !== 'open' || hasOffered}
          >
            {task.status !== 'open' ? 'Not Available' : 
             hasOffered ? 'Offered' : 'Make an Offer'}
          </Button>
        ) : (
          <Link href={`/dashboard/user/tasks/${task.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}