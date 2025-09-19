
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { guideCareer } from "@/ai/flows/career-guide";
import type { CareerGuideOutput } from "@/ai/flows/career-guide";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  interests: z.string().min(5, "Please describe your interests."),
  skills: z.string().min(5, "Please describe your skills."),
});

export function CareerGuideForm() {
  const [suggestions, setSuggestions] = useState<CareerGuideOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      skills: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await guideCareer(values);
      setSuggestions(result);
      toast({
        title: "Suggestions Ready",
        description: "Your career suggestions have been generated.",
      });
    } catch (error) {
      console.error("Suggestion generation failed:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an issue generating suggestions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
            <CardDescription>The more details you provide, the better the suggestions will be.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                        <Textarea placeholder="e.g., Artificial intelligence, creative writing, hiking, video games..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                        <Textarea placeholder="e.g., Python, public speaking, project management, data analysis..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                    </>
                ) : (
                    "Get Suggestions"
                )}
                </Button>
            </form>
            </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Career Suggestions</CardTitle>
          <CardDescription>AI-powered recommendations will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Finding career paths for you...</p>
            </div>
          )}
          {suggestions ? (
            <div className="space-y-6">
              {suggestions.suggestions.map((suggestion, index) => (
                <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Wand2 className="h-5 w-5 text-primary" /> {suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground">{suggestion.fitReason}</p>
                    <div>
                        <h4 className="font-semibold mb-2 text-sm">Next Steps:</h4>
                        <ul className="space-y-2">
                            {suggestion.nextSteps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
              ))}
            </div>
          ) : (
             !isLoading && <div className="flex flex-col items-center justify-center h-64 text-center">
              <Wand2 className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground mt-4">Fill out the form to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
