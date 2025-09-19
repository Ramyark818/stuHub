
"use client";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AI } from "@/app/action";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ChatUI = dynamic(() => import('@/components/chat-ui').then(mod => mod.ChatUI), {
  ssr: false,
  loading: () => <Skeleton className="h-[60vh] w-full" />
});

export default function CareerGuidePage() {
  return (
    <>
      <PageHeader
        title="AI Career Assistant"
        description="Ask our AI career counselor any questions you have about your future path."
      />
      <Card className="h-full flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
            <AI>
                <ChatUI />
            </AI>
        </CardContent>
    </Card>
    </>
  );
}
