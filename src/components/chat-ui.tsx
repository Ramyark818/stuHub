"use client";

import { useState } from "react";
import { AI } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ChatUI() {
  const [messages, setMessages] = AI.useUIState();
  const { submit } = AI.useActions();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || isLoading) return;

    setMessages((currentMessages: any) => [
      ...currentMessages,
      {
        id: Date.now(),
        role: "user",
        display: input,
      },
    ]);
    
    const formData = new FormData();
    formData.append('input', input);

    setInput("");
    setIsLoading(true);

    try {
      const responseMessage = await submit(formData);
      setMessages((currentMessages: any) => [...currentMessages, responseMessage]);
    } catch (error) {
      console.error(error);
       setMessages((currentMessages: any) => [
        ...currentMessages,
        {
          id: Date.now(),
          role: "assistant",
          display: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message: any) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                 <div className="text-sm whitespace-pre-wrap">{message.display}</div>
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
               <Avatar className="h-8 w-8 border">
                 <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
               </Avatar>
               <div className="max-w-[75%] rounded-lg p-3 bg-card flex items-center">
                 <Loader2 className="h-5 w-5 animate-spin" />
               </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}
