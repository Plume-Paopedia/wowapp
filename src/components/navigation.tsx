import Link from "next/link";
import { cn } from "@/lib/utils";
import { User, Shield, Trophy, Target } from "lucide-react";

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Shield,
  },
  {
    name: "Characters",
    href: "/characters",
    icon: User,
  },
  {
    name: "Progression",
    href: "/progression",
    icon: Trophy,
  },
  {
    name: "Objectives",
    href: "/objectives",
    icon: Target,
  },
];

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-secondary transition-colors group"
          >
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-medium group-hover:text-primary transition-colors">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}