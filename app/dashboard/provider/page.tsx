"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/skills/skill-card";
import { Offer, Skill, Task } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import { mockOffers, mockSkills, mockTasks } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TaskCard } from "@/components/tasks/task-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OfferForm } from "@/components/offers/offer-form";
import { toast } from "sonner";

export default function ProviderDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [providerSkills, setProviderSkills] = useState<Skill[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [acceptedTasks, setAcceptedTasks] = useState<Task[]>([]);
  const [providerOffers, setProviderOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);

  useEffect(() => {
    // Redirect if not logged in or not a provider
    if (!user) {
      router.push("/auth/login");
      return;
    } else if (user.data.role !== "provider") {
      router.push("/dashboard/user");
      return;
    }

    // Simulate API calls
    // setProviderSkills(mockSkills.filter(skill => skill.providerId === user.id));
    
    // // Get available tasks
    // setAvailableTasks(mockTasks.filter(task => task.status === "open"));
    
    // // Get provider's offers
    // const offers = mockOffers.filter(offer => offer.providerId === user.id);
    // setProviderOffers(offers);
    
    // // Get accepted tasks
    // const acceptedTaskIds = offers
    //   .filter(offer => offer.status === "accepted")
    //   .map(offer => offer.taskId);
    
    // setAcceptedTasks(mockTasks.filter(task => 
    //   acceptedTaskIds.includes(task.id) && task.status !== "completed"
    // ));
    
    setIsLoading(false);
  }, [user]);

  const handleMakeOffer = (task: Task) => {
    setSelectedTask(task);
    setIsOfferDialogOpen(true);
  };

  const handleOfferSuccess = () => {
    // In a real app, we would fetch the updated offers
    // For now, let's simulate adding a new offer
    if (selectedTask && user) {
      const newOffer: Offer = {
        id: `new-${Date.now()}`,
        taskId: selectedTask.id,
        providerId: user.id,
        hourlyRate: selectedTask.hourlyRate,
        message: "I'm interested in working on this task.",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setProviderOffers([...providerOffers, newOffer]);
      setIsOfferDialogOpen(false);
      setSelectedTask(null);
    }
  };

  const handleUpdateTaskProgress = async (taskId: string) => {
    // In a real app, this would be an API call
    try {
      toast.success("Task progress updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task progress");
    }
  };

  const hasOfferedOn = (taskId: string) => {
    return providerOffers.some(offer => offer.taskId === taskId);
  };

  if (isLoading) {
    return <div className="container py-12">Loading...</div>;
  }

  return (
    <div className="container py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Provider Dashboard</h1>
        <Link href="/dashboard/provider/skills/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="skills">My Skills</TabsTrigger>
          <TabsTrigger value="available">Available Tasks</TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted Tasks
            {acceptedTasks.length > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                {acceptedTasks.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          {providerSkills.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No skills listed yet</h3>
              <p className="text-muted-foreground mb-6">
                Add skills to your profile to get started
              </p>
              <Link href="/dashboard/provider/skills/new">
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="available">
          {availableTasks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No tasks available</h3>
              <p className="text-muted-foreground">
                Check back later for new tasks
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isProvider={true}
                  hasOffered={hasOfferedOn(task.id)}
                  onClick={() => handleMakeOffer(task)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="accepted">
          {acceptedTasks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No accepted tasks</h3>
              <p className="text-muted-foreground">
                Make offers on available tasks to get hired
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedTasks.map((task) => (
                <div key={task.id} className="h-full">
                  <TaskCard
                    task={task}
                    isProvider={false}
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedTask && user && (
            <>
              <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
              <OfferForm
                task={selectedTask}
                providerId={user.id}
                onSuccess={handleOfferSuccess}
                onCancel={() => setIsOfferDialogOpen(false)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}