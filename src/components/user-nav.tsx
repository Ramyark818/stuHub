"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CreditCard, LogOut, Settings, User } from "lucide-react";

type Role = "student" | "faculty" | "admin";

const userProfiles = {
    student: {
        name: "Demo Student",
        email: "student@unitrack.com",
        avatarId: "student-avatar",
    },
    faculty: {
        name: "Dr. Demo Faculty",
        email: "faculty@unitrack.com",
        avatarId: "faculty-avatar",
    },
    admin: {
        name: "Admin User",
        email: "admin@unitrack.com",
        avatarId: "admin-avatar",
    }
}

export function UserNav() {
  const [role, setRole] = useState<Role>("student");
  
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as Role | null;
    if (savedRole && ["student", "faculty", "admin"].includes(savedRole)) {
      setRole(savedRole);
    }
  }, []);

  const profile = userProfiles[role];
  const userAvatar = PlaceHolderImages.find(p => p.id === profile.avatarId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" />}
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
