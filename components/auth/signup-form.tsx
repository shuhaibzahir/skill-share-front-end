"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const formSchema = z.object({
  type: z.enum(["individual", "company"]),
  role: z.enum(["user", "provider"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  mobileNumber: z.string().min(10),
  streetNumber: z.string().optional(),
  streetName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postCode: z.string().optional(),
  companyName: z.string().optional(),
  phoneNumber: z.string().optional(),
  businessTaxNumber: z.string().optional(),
});

export function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "individual",
      role: "user",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobileNumber: "",
      streetNumber: "",
      streetName: "",
      city: "",
      state: "",
      postCode: "",
      companyName: "",
      phoneNumber: "",
      businessTaxNumber: "",
    },
  });


  const deleteUnwantedKeys = (object,keys)=>{
    keys.forEach((i)=> delete object[i])
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        address: {
          streetNumber: values.streetNumber,
          streetName: values.streetName,
          city: values.city,
          state: values.state,
          postCode: values.postCode,
        },
      };
      deleteUnwantedKeys(payload,["streetNumber","streetName","city","state","postCode"])

      const success = await signup(payload);
      if (success) {
        toast.success("Account created successfully");
        router.push("/");
      } else {
        toast.error("Email already in use");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your details to sign up
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-6 space-y-2 flex flex-wrap ">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {["firstName", "lastName", "email", "password", "mobileNumber", "streetNumber", "streetName", "city", "state", "postCode", "companyName", "businessTaxNumber"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof typeof formSchema._type}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{name.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={`Enter ${name}`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Already have an account? <Link href="/auth/login" className="underline">Login</Link>
      </div>
    </div>
  );
}
