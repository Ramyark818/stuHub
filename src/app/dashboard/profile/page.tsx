
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from "@/components/page-header";

const ProfileView = dynamic(() => import('@/components/profile-view').then(mod => mod.ProfileView), { 
  ssr: false,
  loading: () => (
     <>
        <PageHeader title="My Profile" description="View and manage your personal information." />
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-28" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div className="space-y-2" key={i}>
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>
             <Skeleton className="h-10 w-32" />
        </div>
    </>
  )
});

export default function ProfilePage() {
    return <ProfileView />;
}
