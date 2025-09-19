
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { guideCareer } from "@/ai/flows/career-guide";
import type { CareerGuideOutput } from "@/ai/flows/career-guide";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, PlusCircle, Trash2, Wand2, Briefcase, MessagesSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AI } from "@/app/action";
import { ChatUI } from "@/components/chat-ui";


const formSchema = z.object({
  skills: z.array(z.object({ value: z.string().min(1, "Skill cannot be empty") })).min(1, "Please enter at least one skill."),
  interests: z.array(z.object({ value: z.string().min(1, "Interest cannot be empty") })).min(1, "Please enter at least one interest."),
});

function CareerChat() {
    return (
        <AI>
            <ChatUI />
        </AI>
    )
}

export default function CareerGuidePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<CareerGuideOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [{ value: "React" }, { value: "Node.js" }],
      interests: [{ value: "Artificial Intelligence" }, { value: "Hiking" }],
    },
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
    control: form.control,
    name: "interests",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResults(null);

    const input = {
      skills: values.skills.map(s => s.value),
      interests: values.interests.map(i => i.value),
    };

    try {
      const response = await guideCareer(input);
      setResults(response);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Guidance Failed",
        description: "There was an issue generating career guidance. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Career Guide Assistant"
        description="Get personalized career suggestions based on your skills and interests."
      />
      <Tabs defaultValue="suggestions" className="flex-1 w-full flex flex-col">
        <TabsList className="w-full sm:w-auto self-start">
            <TabsTrigger value="suggestions"><Wand2 className="mr-2" /> Get Suggestions</TabsTrigger>
            <TabsTrigger value="chat"><MessagesSquare className="mr-2" /> AI Career Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="suggestions" className="flex-1 w-full mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                            <CardDescription>Tell us about your skills and what you're passionate about.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div>
                                    <FormLabel>Skills</FormLabel>
                                    <div className="space-y-2 mt-2">
                                    {skillFields.map((field, index) => (
                                        <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`skills.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., Python" />
                                                </FormControl>
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)} disabled={skillFields.length <= 1}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    ))}
                                    </div>
                                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendSkill({ value: "" })}>
                                        <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                                    </Button>
                                </div>
                                
                                <div>
                                    <FormLabel>Interests</FormLabel>
                                    <div className="space-y-2 mt-2">
                                    {interestFields.map((field, index) => (
                                        <FormField
                                        key={field.id}
                                        control={form.control}
                                        name={`interests.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., Graphic Design" />
                                                </FormControl>
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeInterest(index)} disabled={interestFields.length <= 1}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                    ))}
                                    </div>
                                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendInterest({ value: "" })}>
                                        <PlusCircle className="h-4 w-4 mr-2" /> Add Interest
                                    </Button>
                                </div>
                                
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                                    ) : (
                                        <><Wand2 className="mr-2 h-4 w-4" /> Get Career Guidance</>
                                    )}
                                </Button>
                            </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Your Suggested Career Paths</CardTitle>
                            <CardDescription>Our AI has analyzed your profile and suggests the following careers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center h-96 gap-4 text-muted-foreground">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p>Finding the best careers for you...</p>
                                </div>
                            )}

                            {results && (
                                <div className="space-y-6">
                                    {results.suggestions.map((suggestion, index) => (
                                        <div key={index}>
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <Briefcase className="h-5 w-5 text-primary" />
                                                {suggestion.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                                            <p className="text-sm mt-2 p-3 bg-secondary rounded-md"><span className="font-semibold">Why it's a match:</span> {suggestion.reason}</p>
                                            {index < results.suggestions.length - 1 && <Separator className="my-6" />}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!isLoading && !results && (
                                <div className="flex flex-col items-center justify-center h-96 gap-4 text-center text-muted-foreground">
                                    <Wand2 className="h-16 w-16" />
                                    <p className="text-lg">Your career guidance will appear here.</p>
                                    <p className="text-sm">Fill out your skills and interests to get started.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="chat" className="flex-1 w-full mt-6 h-full">
             <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>AI Career Chat</CardTitle>
                    <CardDescription>Ask our AI career counselor any questions you have about your future path.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <CareerChat />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
    </>
  );
}
