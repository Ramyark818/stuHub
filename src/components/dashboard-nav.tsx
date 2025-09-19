"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bot, FileUp, LayoutDashboard, Settings, University, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Role = "student" | "faculty" | "admin";

const studentNavItems = [
  { href: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/upload", label: "Upload Records", icon: FileUp },
  { href: "/dashboard/chat", label: "AI Assistant", icon: Bot },
];

const facultyNavItems = [
  { href: "/dashboard/faculty", label: "Dashboard", icon: LayoutDashboard },
];

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
  { href: "/dashboard/admin/classes", label: "Manage Classes", icon: University },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    // Set initial role from localStorage or default to student
    const savedRole = localStorage.getItem("userRole") as Role | null;
    if (savedRole && ["student", "faculty", "admin"].includes(savedRole)) {
      setRole(savedRole);
    } else {
      setRole("student");
    }
  }, []);
  
  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);

    // Navigate to the default dashboard for the new role
    if (newRole === 'student') {
        router.push('/dashboard/student');
    } else if (newRole === 'faculty') {
        router.push('/dashboard/faculty');
    } else if (newRole === 'admin') {
        router.push('/dashboard/admin');
    }
  };

  if (!role) {
    return null; // Or a loading skeleton
  }

  return (
    <nav className="flex flex-col h-full gap-4 p-4">
      <div className="px-2">
        <Select value={role} onValueChange={(value) => handleRoleChange(value as Role)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student View</SelectItem>
            <SelectItem value="faculty">Faculty View</SelectItem>
            <SelectItem value="admin">Admin View</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator />

      <div className="flex-1 space-y-2">
        {role === "student" && studentNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === item.href && "bg-accent text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}

        {role === "faculty" && facultyNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              pathname === item.href && "bg-accent text-primary"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}

        {role === "admin" && (
          <>
            <h3 className="px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">Admin</h3>
            {adminNavItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname.startsWith(item.href) && pathname !== '/dashboard/admin' ? "bg-accent text-primary" : pathname === item.href ? "bg-accent text-primary" : "",
                item.href === '/dashboard/admin' && pathname === '/dashboard/admin' && "bg-accent text-primary"
                )}
            >
                <item.icon className="h-4 w-4" />
                {item.label}
            </Link>
            ))}
          </>
        )}
      </div>

      <div className="mt-auto space-y-2">
        <Link
          href="/dashboard/profile"
          className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === '/dashboard/profile' && 'bg-accent text-primary'
          )}
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </nav>
  );
}
