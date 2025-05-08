"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideCode, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
  ];

  if (user) {
    if (user.role === "user") {
      routes.push({
        href: "/dashboard/user",
        label: "Dashboard",
        active: pathname === "/dashboard/user",
      });
    } else {
      routes.push({
        href: "/dashboard/provider",
        label: "Dashboard",
        active: pathname === "/dashboard/provider",
      });
    }
  } else {
    routes.push(
      {
        href: "/auth/login",
        label: "Login",
        active: pathname === "/auth/login",
      },
      {
        href: "/auth/signup",
        label: "Sign Up",
        active: pathname === "/auth/signup",
      }
    );
  }

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:hidden">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      route.active ? "text-primary" : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {user && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <LucideCode className="h-6 w-6" />
            <span className="font-bold inline-block">SkillShare</span>
          </Link>
        </div>
        <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden sm:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:flex items-center space-x-4">
          {user && (
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}