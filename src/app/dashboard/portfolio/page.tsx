
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getStudentData } from "@/lib/student-data";
import { Award, Briefcase, Code, GraduationCap, HandHeart, Heart, Linkedin, Github, FileText as PublicationIcon, User } from "lucide-react";


export default function PortfolioPage() {
    const { 
        education, 
        skills, 
        interests, 
        linkedin, 
        github, 
        publications, 
        achievements, 
        projects, 
        voluntaryWorks 
    } = getStudentData();
    
    const studentAvatar = PlaceHolderImages.find(p => p.id === 'student-avatar');

    return (
        <>
            <PageHeader title="Student Portfolio" description="A comprehensive showcase of academic and professional achievements." />
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="overflow-hidden">
                        <div className="h-32 bg-primary" />
                        <CardContent className="flex flex-col items-center text-center -mt-16 p-6">
                            <Avatar className="h-32 w-32 border-4 border-card mb-4">
                                {studentAvatar && <AvatarImage src={studentAvatar.imageUrl} alt="Demo Student" data-ai-hint={studentAvatar.imageHint} />}
                                <AvatarFallback>
                                    <User className="h-16 w-16" />
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold">Demo Student</h2>
                            <p className="text-muted-foreground">Computer Science Major</p>
                            {education && <p className="text-sm text-muted-foreground mt-2">{education}</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact & Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {linkedin && (
                                <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:underline">
                                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                                    <span>{linkedin}</span>
                                </a>
                            )}
                            {github && (
                                <a href={`https://${github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:underline">
                                    <Github className="h-5 w-5 text-muted-foreground" />
                                    <span>{github}</span>
                                </a>
                            )}
                        </CardContent>
                    </Card>
                    
                    {interests && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5" /> Interests</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {interests.map(interest => <Badge key={interest} variant="outline">{interest}</Badge>)}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                     {skills && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" /> Professional Skills</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </CardContent>
                        </Card>
                    )}

                    {achievements.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Achievements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                                    {achievements.map(ach => <li key={ach.name}>{ach.name}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {projects.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5" /> Projects</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                                    {projects.map(proj => <li key={proj.name}>{proj.name}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                     {publications.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><PublicationIcon className="h-5 w-5" /> Publications</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                                    {publications.map(pub => <li key={pub.name}>{pub.name}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {voluntaryWorks.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><HandHeart className="h-5 w-5" /> Voluntary Work</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                                    {voluntaryWorks.map(work => <li key={work.name}>{work.name}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
