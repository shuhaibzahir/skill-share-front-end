"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { mockOffers, mockTasks } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Offer, Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OfferCard } from "@/components/offers/offer-card";
import { CalendarIcon, CheckIcon, ClockIcon, DollarSign, EditIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in or not a user
    if (!user) {
      router.push("/auth/login");
      return;
    } else if (user.role !== "user") {
      router.push("/dashboard/provider");
      return;
    }

    // Get task details
    const taskId = Array.isArray(id) ? id[0] : id;
    const foundTask = mockTasks.find(t => t.id === taskId);
    
    if (!foundTask || foundTask.userId !== user.id) {
      router.push("/dashboard/user");
      return;
    }
    
    setTask(foundTask);
    
    // Get offers for this task
    const taskOffers = mockOffers.filter(offer => offer.taskId === taskId);
    setOffers(taskOffers);
    
    setIsLoading(false);
  }, [id, user, router]);

  const handleAcceptOffer = async (offerId: string) => {
    // In a real app, this would be an API call
    try {
      toast.success("Offer accepted successfully");

      // Update local state to reflect changes
      setOffers(prev => 
        prev.map(offer => 
          offer.id === offerId 
            ? { ...offer, status: 'accepted' } 
            : offer.id !== offerId 
            ? { ...offer, status: 'rejected' }
            : offer
        )
      );

      // Update task status to in-progress
      if (task) {
        setTask({ ...task, status: 'in-progress' });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept offer");
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    // In a real app, this would be an API call
    try {
      toast.success("Offer rejected");

      // Update local state to reflect changes
      setOffers(prev => 
        prev.map(offer => 
          offer.id === offerId 
            ? { ...offer, status: 'rejected' } 
            : offer
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject offer");
    }
  };

  const handleCompleteTask = async () => {
    if (!task) return;
    
    // In a real app, this would be an API call
    try {
      toast.success("Task marked as completed");

      // Update local state to reflect changes
      setTask({
        ...task,
        status: 'completed'
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark task as completed");
    }
  };

  if (isLoading || !task) {
    return <div className="container py-12">Loading...</div>;
  }

  const acceptedOffer = offers.find(o => o.status === 'accepted');

  const statusColors = {
    'open': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'completed': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <div className="container py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{task.name}</h1>
          <Badge className={statusColors[task.status]}>
            {task.status === 'in-progress' ? 'In Progress' : 
             task.status === 'completed' ? 'Completed' : 'Open'}
          </Badge>
        </div>
        {task.status === 'open' && (
          <Link href={`/dashboard/user/tasks/${task.id}/edit`}>
            <Button variant="outline">
              <EditIcon className="h-4 w-4 mr-2" />
              Edit Task
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-2 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
              <Badge variant="outline">{task.category}</Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
              <Badge className={statusColors[task.status]}>
                {task.status === 'in-progress' ? 'In Progress' : 
                 task.status === 'completed' ? 'Completed' : 'Open'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">Start Date</h3>
                <p className="text-sm text-muted-foreground">{formatDate(task.startDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">Working Hours</h3>
                <p className="text-sm text-muted-foreground">{task.workingHours} hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">Hourly Rate</h3>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(task.hourlyRate, task.currency)}/hour
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Task Summary</h2>
          
          <div className="flex-1 mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Hourly Rate</span>
              <span className="font-medium">{formatCurrency(task.hourlyRate, task.currency)}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-muted-foreground">Working Hours</span>
              <span className="font-medium">{task.workingHours}</span>
            </div>
            <div className="flex justify-between items-center mb-1 pt-1 border-t">
              <span className="text-sm font-medium">Total Budget</span>
              <span className="font-bold">{formatCurrency(task.hourlyRate * task.workingHours, task.currency)}</span>
            </div>
          </div>
          
          {task.status === 'in-progress' && (
            <Button onClick={handleCompleteTask}>
              <CheckIcon className="h-4 w-4 mr-2" />
              Mark as Completed
            </Button>
          )}
          
          {task.status === 'completed' && (
            <div className="text-center text-green-600 font-medium">
              <CheckIcon className="h-5 w-5 mx-auto mb-2" />
              Task Completed
            </div>
          )}
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Offers</h2>
        
        {offers.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">No offers yet</h3>
            <p className="text-muted-foreground">
              Providers will make offers on your task soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onAccept={task.status === 'open' ? handleAcceptOffer : undefined}
                onReject={task.status === 'open' ? handleRejectOffer : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}