
"use client";

import dynamic from 'next/dynamic';
import { PageHeader } from "@/components/page-header";
import { Skeleton } from '@/components/ui/skeleton';

const CareerGuideForm = dynamic(() => import('@/components/career-guide-form').then(mod => mod.CareerGuideForm), { 
  ssr: false,
  loading: () => (
    <div className="grid gap-8 md:grid-cols-2">
      <Skeleton className="h-96" />
      <Skeleton className="h-96" />
    </div>
  )
});

export default function CareerGuidePage() {
  return (
    <>
      <PageHeader
        title="AI Career Guide"
        description="Get personalized career suggestions based on your interests and skills."
      />
      <CareerGuideForm />
    </>
  );
}
