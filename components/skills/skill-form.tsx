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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, Category, Skill, WORK_TYPES, WorkType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  category: z.enum(CATEGORIES as [Category, ...Category[]]),
  experience: z.coerce.number().min(0, { message: "Experience must be a positive number" }),
  workType: z.enum(WORK_TYPES as [WorkType, ...WorkType[]]),
  hourlyRate: z.coerce.number().min(1, { message: "Hourly rate must be at least 1" }),
});

type SkillFormValues = z.infer<typeof formSchema>;

interface SkillFormProps {
  skill?: Skill;
  providerId: string;
}

export function SkillForm({ skill, providerId }: SkillFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: skill ? {
      category: skill.category,
      experience: skill.experience,
      workType: skill.workType,
      hourlyRate: skill.hourlyRate,
    } : {
      category: "Web Development",
      experience: 1,
      workType: "Online",
      hourlyRate: 25,
    },
  });

  async function onSubmit(values: SkillFormValues) {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      console.log("Form values:", values);
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (skill) {
        toast.success("Skill updated successfully");
      } else {
        toast.success("Skill created successfully");
      }
      
      router.push("/dashboard/provider");
      router.refresh();
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step={0.5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="workType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {WORK_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate (USD)</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-3 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : skill ? "Update Skill" : "Create Skill"}
          </Button>
        </div>
      </form>
    </Form>
  );
}