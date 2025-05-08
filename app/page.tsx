'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CATEGORIES } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const {user} = useAuth()
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with Skilled Professionals
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Post tasks, find skilled help, or offer your expertise to clients worldwide.
            </p>
            {!user && 
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="min-w-[150px]">
                  Get Started
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="min-w-[150px] bg-background/10 hover:bg-background/20 border-primary-foreground/20">
                  Login
                </Button>
              </Link>
            </div>  
            }   
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <div
                key={category}
                className="bg-card rounded-lg p-8 text-center shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <p className="text-muted-foreground mb-6">
                  {category === "Web Development"
                    ? "Find expert developers for websites, apps, and more."
                    : category === "Design"
                    ? "Connect with creative designers for all your visual needs."
                    : "Learn from skilled professionals in various subjects."}
                </p>
                <Link href={`/auth/signup`}>
                  <Button variant="outline" className="w-full">
                    Explore {category}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-lg p-8 bg-card shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">For Clients</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <span>Post your task with details and budget</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <span>Receive offers from skilled professionals</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <span>Choose the best provider for your task</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                  <span>Track progress and approve completion</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth/signup">
                  <Button className="w-full">Find a Provider</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-lg p-8 bg-card shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">For Providers</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <span>Create a profile showcasing your skills</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <span>Browse available tasks in your expertise</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <span>Submit offers for tasks you can complete</span>
                </li>
                <li className="flex gap-3">
                  <span className="bg-primary/10 text-primary font-medium h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                  <span>Get hired and earn money doing what you love</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/auth/signup">
                  <Button className="w-full">Become a Provider</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Join our community today and connect with professionals or find clients worldwide.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="min-w-[200px] bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}