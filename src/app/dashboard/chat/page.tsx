import { PageHeader } from "@/components/page-header";
import { ChatUI } from "@/components/chat-ui";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="AI Student Assistant"
        description="Ask me anything about university resources, procedures, or general information."
      />
      <Card className="flex-1 flex flex-col">
        <ChatUI />
      </Card>
    </div>
  );
}
