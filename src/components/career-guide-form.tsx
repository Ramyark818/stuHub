
"use client";

import { useState } from "react";
import { guideCareer } from "@/ai/flows/career-guide";
import type { CareerGuideOutput } from "@/ai/flows/career-guide";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, ArrowRight, X, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { getStudentData } from "@/lib/student-data";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

export function CareerGuideForm() {
  const studentData = getStudentData();
  const [suggestions, setSuggestions] = useState<CareerGuideOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState<string[]>(studentData.interests || []);
  const [skills, setSkills] = useState<string[]>(studentData.skills || []);
  const [newInterest, setNewInterest] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const { toast } = useToast();

  const handleAddItem = (
    list: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>, 
    newItem: string,
    newItemSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (newItem && !list.includes(newItem)) {
      setter([...list, newItem]);
      newItemSetter("");
    }
  };

  const handleRemoveItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, itemToRemove: string) => {
    setter(currentItems => currentItems.filter(item => item !== itemToRemove));
  };


  async function handleSubmit() {
    if (skills.length === 0 || interests.length === 0) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please add at least one skill and one interest.",
        });
        return;
    }
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await guideCareer({ interests, skills });
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
            <CardTitle>Your Skills & Interests</CardTitle>
            <CardDescription>Your skills and interests from your profile are pre-filled. Add or remove them to tailor your results.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                 <div className="space-y-3">
                    <Label>Your Interests</Label>
                    <div className="flex flex-wrap gap-2">
                        {interests.map(item => (
                            <Badge key={item} variant="outline" className="flex items-center gap-1.5">
                                {item}
                                <button onClick={() => handleRemoveItem(setInterests, item)} className="hover:text-destructive">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input 
                            value={newInterest}
                            onChange={(e) => setNewInterest(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem(interests, setInterests, newInterest, setNewInterest)}
                            placeholder="Add an interest..."
                        />
                        <Button variant="outline" size="icon" onClick={() => handleAddItem(interests, setInterests, newInterest, setNewInterest)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label>Your Skills</Label>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(item => (
                            <Badge key={item} variant="secondary" className="flex items-center gap-1.5">
                                {item}
                                <button onClick={() => handleRemoveItem(setSkills, item)} className="hover:text-destructive">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input 
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddItem(skills, setSkills, newSkill, setNewSkill)}
                            placeholder="Add a skill..."
                        />
                        <Button variant="outline" size="icon" onClick={() => handleAddItem(skills, setSkills, newSkill, setNewSkill)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                    </>
                ) : (
                    "Get Suggestions"
                )}
                </Button>
            </div>
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
              <p className="text-muted-foreground mt-4">Review your skills and interests to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
