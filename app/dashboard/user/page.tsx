"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/task-card";
import { Offer, Task } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { mockOffers, mockTasks } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OfferCard } from "@/components/offers/offer-card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTasks } from "@/api/taskService";

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [userTasks, setUserTasks] = useState<any[]>([]);
  const [userOffers, setUserOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in or not a user
    if (!user) {
      router.push("/auth/login");
      return;
    } else if (user.data.role !== "user") {
      router.push("/dashboard/provider");
      return;
    }

    // Fetch user tasks and offers
    getTasks().then((res) => {
      if (!res) {   
        toast.error("Failed to fetch tasks");
        return;
      }
      const tasks = res.data.data;
      setUserTasks(tasks)

    })
  
    
    // Get all offers for the user's tasks
    const offers = mockTasks
      .filter(task => task.userId === user.id)
      .flatMap(task => mockOffers.filter(offer => offer.taskId === task.id));
    
    setUserOffers(offers);
    setIsLoading(false);
  }, [user, router]);

  const handleAcceptOffer = async (offerId: string) => {
    // In a real app, this would be an API call
    try {
      toast.success("Offer accepted successfully");

      // Update local state to reflect changes
      setUserOffers(prev => 
        prev.map(offer => 
          offer.id === offerId 
            ? { ...offer, status: 'accepted' } 
            : offer.id !== offerId && offer.taskId === userOffers.find(o => o.id === offerId)?.taskId
            ? { ...offer, status: 'rejected' }
            : offer
        )
      );

      // Update task status to in-progress
      const acceptedOffer = userOffers.find(o => o.id === offerId);
      if (acceptedOffer) {
        setUserTasks(prev => 
          prev.map(task => 
            task.id === acceptedOffer.taskId 
              ? { ...task, status: 'in-progress' } 
              : task
          )
        );
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
      setUserOffers(prev => 
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

  const handleCompleteTask = async (taskId: string) => {
    // In a real app, this would be an API call
    try {
      toast.success("Task marked as completed");

      // Update local state to reflect changes
      setUserTasks(prev => 
        prev.map(task => 
          task.id === taskId 
            ? { ...task, status: 'completed' } 
            : task
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark task as completed");
    }
  };

  if (isLoading) {
    return <div className="container py-12">Loading...</div>;
  }

  return (
    <div className="container py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Link href="/dashboard/user/tasks/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="offers">
            Offers{" "}
            {userOffers.filter(o => o.status === "pending").length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                {userOffers.filter(o => o.status === "pending").length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          {userTasks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No tasks yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first task to get started
              </p>
              <Link href="/dashboard/user/tasks/new">
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="offers">
          {userOffers.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No offers yet</h3>
              <p className="text-muted-foreground">
                Create tasks to receive offers from providers
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Pending Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userOffers
                  .filter(o => o.status === "pending")
                  .map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      task={userTasks.find(t => t.id === offer.taskId)}
                      onAccept={handleAcceptOffer}
                      onReject={handleRejectOffer}
                    />
                  ))}
              </div>

              {userOffers.filter(o => o.status !== "pending").length > 0 && (
                <>
                  <h3 className="text-xl font-medium mt-8 mb-4">Past Offers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userOffers
                      .filter(o => o.status !== "pending")
                      .map((offer) => (
                        <OfferCard
                          key={offer.id}
                          offer={offer}
                          task={userTasks.find(t => t.id === offer.taskId)}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}