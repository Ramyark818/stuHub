
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UploadCloud } from "lucide-react";

const formSchema = z.object({
  documentType: z.string({ required_error: "Please select a document type." }),
  documentName: z.string().min(3, "Document name must be at least 3 characters."),
  document: z
    .any()
    .refine((files) => files?.length == 1, "A file is required.")
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ["application/pdf", "image/png", "image/jpeg", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(files?.[0]?.type),
      "Only .pdf, .png, .jpg, .doc, and .docx formats are supported."
    ),
  comments: z.string().optional(),
});

const documentTypes = [
    "Experience", "Internship", "Course", "Achievement", "Voluntary Work", "Project", "Other"
];

export function FacultyApprovalUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        documentName: "",
        comments: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Form submitted:", values);

    toast({
      title: "Document Submitted",
      description: `Your document "${values.documentName}" has been sent for faculty approval.`,
    });
    
    form.reset();
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a document type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {documentTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="documentName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Document Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Summer Internship at TechCorp" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                  <div className="relative">
                  <UploadCloud className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="file" 
                    className="pl-10"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={(e) => field.onChange(e.target.files)} 
                  />
                  </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Comments (Optional)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Add any relevant notes for the faculty reviewer..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit for Approval"
          )}
        </Button>
      </form>
    </Form>
  );
}
