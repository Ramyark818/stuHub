import { PageHeader } from "@/components/page-header";
import { ChatUI } from "@/components/chat-ui";
import { AI } from "@/app/action";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <AI>
      <div className="flex flex-col h-full">
        <PageHeader
          title="AI Student Assistant"
          description="Ask me anything about university resources, procedures, or general information."
        />
        <Card className="flex-1 flex flex-col">
          <ChatUI />
        </Card>
      </div>
    </AI>
  );
}
