
"use client";

import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { AI } from "@/app/action";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ChatUI = dynamic(() => import('@/components/chat-ui').then(mod => mod.ChatUI), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full" />
});

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI Student Assistant"
        description="Ask me anything about university resources, procedures, or general information."
      />
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          <AI>
            <ChatUI />
          </AI>
        </CardContent>
      </Card>
    </div>
  );
}
