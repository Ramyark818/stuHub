
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User } from "lucide-react";

type Role = "student" | "faculty" | "admin";

const profileData = {
    student: {
        name: "Demo Student",
        email: "student@stuhub.com",
        phone: "+1 (555) 123-4567",
        role: "Student",
        avatarId: "student-avatar",
    },
    faculty: {
        name: "Dr. Demo Faculty",
        email: "faculty@stuhub.com",
        phone: "+1 (555) 987-6543",
        role: "Faculty",
        avatarId: "faculty-avatar",
    },
    admin: {
        name: "Admin User",
        email: "admin@stuhub.com",
        phone: "+1 (555) 555-5555",
        role: "Admin",
        avatarId: "admin-avatar",
    }
}

export function ProfileView() {
    const [role, setRole] = useState<Role>("student");

    useEffect(() => {
        const savedRole = localStorage.getItem("userRole") as Role | null;
        if (savedRole && ["student", "faculty", "admin"].includes(savedRole)) {
            setRole(savedRole);
        }

        const handleRoleChange = () => {
            const newSavedRole = localStorage.getItem("userRole") as Role | null;
            if (newSavedRole && ["student", "faculty", "admin"].includes(newSavedRole)) {
                setRole(newSavedRole);
            } else {
                setRole("student"); // Default role
            }
        };

        window.addEventListener('userRoleChanged', handleRoleChange);

        return () => {
            window.removeEventListener('userRoleChanged', handleRoleChange);
        };
    }, []);

    const userProfile = profileData[role];
    const userAvatar = PlaceHolderImages.find(p => p.id === userProfile.avatarId);

    return (
        <>
            <PageHeader title="My Profile" description="View and manage your personal information." />

            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                           {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User avatar" data-ai-hint={userAvatar.imageHint} />}
                            <AvatarFallback>
                                <User className="h-10 w-10"/>
                            </AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Photo</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={userProfile.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={userProfile.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" defaultValue={userProfile.phone} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" defaultValue={userProfile.role} disabled />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Changes</Button>
                </CardFooter>
            </Card>
        </>
    )
}
