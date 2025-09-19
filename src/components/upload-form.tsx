
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { assessTranscript } from "@/ai/flows/transcript-assessment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud, FileText, Star, TrendingDown } from "lucide-react";
import type { TranscriptAssessmentOutput } from "@/ai/flows/transcript-assessment";

const formSchema = z.object({
  transcript: z
    .any()
    .refine((files) => files?.length == 1, "Transcript is required.")
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ["application/pdf", "image/png", "image/jpeg"].includes(files?.[0]?.type),
      "Only .pdf, .png, and .jpg formats are supported."
    ),
});

export function UploadForm() {
  const [assessment, setAssessment] = useState<TranscriptAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAssessment(null);
    try {
      const file = values.transcript[0];
      const dataUri = await fileToBase64(file);
      
      const result = await assessTranscript({ transcriptDataUri: dataUri });
      
      setAssessment(result);
      toast({
        title: "Assessment Complete",
        description: "Your transcript has been successfully analyzed.",
      });
    } catch (error) {
      console.error("Assessment failed:", error);
      toast({
        variant: "destructive",
        title: "Assessment Failed",
        description: "There was an issue analyzing your transcript. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Transcript</CardTitle>
          <CardDescription>Upload your academic transcript for AI-powered assessment.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="transcript"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transcript File</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type="file" 
                          className="pl-10"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={(e) => field.onChange(e.target.files)} 
                        />
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Assess Transcript"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>Results from the AI analysis will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your transcript...</p>
            </div>
          )}
          {assessment ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground">{assessment.summary}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-accent p-2 rounded-full"><Star className="h-5 w-5 text-accent-foreground" /></div>
                  <div>
                    <h4 className="font-semibold">GPA</h4>
                    <p className="text-2xl font-bold">{assessment.gpa.toFixed(2)}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                    <div className="bg-accent p-2 rounded-full"><FileText className="h-5 w-5 text-accent-foreground" /></div>
                    <div>
                        <h4 className="font-semibold">Courses Completed</h4>
                        <p className="text-2xl font-bold">{assessment.completedCourses.length}</p>
                    </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2"><TrendingDown className="h-5 w-5" /> Areas for Improvement</h3>
                <p className="text-sm text-muted-foreground">{assessment.areasForImprovement}</p>
              </div>
            </div>
          ) : (
             !isLoading && <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground mt-4">Upload a document to see the analysis.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
