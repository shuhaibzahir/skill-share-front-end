"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  hourlyRate: z.coerce.number().min(1, { message: "Hourly rate must be at least 1" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type OfferFormValues = z.infer<typeof formSchema>;

interface OfferFormProps {
  task: Task;
  providerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function OfferForm({ task, providerId, onSuccess, onCancel }: OfferFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hourlyRate: task.hourlyRate,
      message: "",
    },
  });

  async function onSubmit(values: OfferFormValues) {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log("Offer values:", {
        taskId: task.id,
        providerId,
        ...values,
      });
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Offer submitted successfully");
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-sm">
          <p className="font-medium">Task: {task.name}</p>
          <p className="text-muted-foreground mt-1">
            Client's proposed rate: {formatCurrency(task.hourlyRate, task.currency)}/hr
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Hourly Rate ({task.currency})</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message to Client</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Why are you the right person for this task?" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-3 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Offer"}
          </Button>
        </div>
      </form>
    </Form>
  );
}