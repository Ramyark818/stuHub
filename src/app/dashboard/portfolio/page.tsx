
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, Briefcase, Code, GraduationCap, HandHeart, Heart, Linkedin, Github, FileText as PublicationIcon, User } from "lucide-react";

// This data is duplicated from the student dashboard for simplicity.
// In a real app, this would come from a shared data source.
const documents = [
    { name: "Bachelor of Science in Computer Science", type: "Education", status: "Approved", date: "2024-05-10" },
    { name: "React, Next.js, TypeScript, Node.js", type: "Skills", status: "Approved", date: "2024-10-01" },
    { name: "AI in Education, Hiking, Chess", type: "Interests", status: "Approved", date: "2024-10-01" },
    { name: "linkedin.com/in/demostudent", type: "LinkedIn", status: "Approved", date: "2024-10-01" },
    { name: "github.com/demostudent", type: "GitHub", status: "Approved", date: "2024-10-01" },
    { name: "'The Future of AI in Higher Education', J. of EdTech", type: "Publication", status: "Approved", date: "2024-07-15" },
    { name: "Summer Internship at TechCorp", type: "Internship", status: "Approved", date: "2024-09-01" },
    { name: "Advanced React Course", type: "Course", status: "Approved", date: "2024-10-25" },
    { name: "Hackathon Winner: Best Use of AI", type: "Achievement", status: "Approved", date: "2024-08-15" },
    { name: "Dean's List 2023", type: "Achievement", status: "Approved", date: "2023-12-20" },
    { name: "Community Food Bank App", type: "Project", status: "Approved", date: "2023-11-01" },
    { name: "Local Animal Shelter Volunteer", type: "Voluntary Work", status: "Approved", date: "2024-06-01" },
    { name: "Part-time work at Cafe", type: "Experience", status: "Rejected", date: "2024-07-20" },
    { name: "Minor in Economics", type: "Education", status: "Rejected", date: "2024-05-10" },
];

const approvedDocuments = documents.filter(doc => doc.status === 'Approved');
const education = approvedDocuments.find(doc => doc.type === 'Education')?.name;
const skills = approvedDocuments.find(doc => doc.type === 'Skills')?.name.split(', ');
const interests = approvedDocuments.find(doc => doc.type === 'Interests')?.name.split(', ');
const linkedin = approvedDocuments.find(doc => doc.type === 'LinkedIn')?.name;
const github = approvedDocuments.find(doc => doc.type === 'GitHub')?.name;
const publications = approvedDocuments.filter(doc => doc.type === 'Publication');
const achievements = approvedDocuments.filter(doc => doc.type === 'Achievement');
const projects = approvedDocuments.filter(doc => doc.type === 'Project');
const voluntaryWorks = approvedDocuments.filter(doc => doc.type === 'Voluntary Work');
const studentAvatar = PlaceHolderImages.find(p => p.id === 'student-avatar');

export default function PortfolioPage() {
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
