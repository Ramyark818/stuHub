

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Star, Book, Clock, CheckCircle, XCircle, GraduationCap, Code, Heart, FileText as PublicationIcon, Linkedin, Github, Award, Briefcase, HandHeart } from "lucide-react";
import { getStudentData } from "@/lib/student-data";

const stats = [
    { title: "Overall GPA", value: "3.85", icon: <Star className="h-6 w-6 text-muted-foreground" /> },
    { title: "Completed Courses", value: "24", icon: <Book className="h-6 w-6 text-muted-foreground" /> },
    { title: "Upcoming Deadlines", value: "3", icon: <Clock className="h-6 w-6 text-muted-foreground" /> },
];

const deadlines = [
    { course: "CS 450: Advanced Algorithms", task: "Project Proposal", due: "2024-11-15", status: "Upcoming" },
    { course: "MA 321: Real Analysis", task: "Homework 5", due: "2024-11-18", status: "Upcoming" },
    { course: "PH 210: Modern Physics", task: "Midterm Exam", due: "2024-11-22", status: "Upcoming" },
    { course: "EN 101: Academic Writing", task: "Final Essay Draft", due: "2024-11-10", status: "Past Due" },
];

export default function StudentDashboard() {
  const {
    education,
    skills,
    interests,
    linkedin,
    github,
    publications,
    achievements,
    projects,
    voluntaryWorks,
    documents
  } = getStudentData();

  return (
    <>
      <PageHeader title="Student Dashboard" description="Your academic overview at a glance." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
             <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last semester</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-6">
            {education && (
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{education}</p>
                    </CardContent>
                </Card>
            )}
            <div className="grid md:grid-cols-2 gap-6">
                 {skills && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5" /> Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </CardContent>
                    </Card>
                )}
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
             {publications.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PublicationIcon className="h-5 w-5" /> Publications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            {publications.map(pub => <li key={pub.name}>{pub.name}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            )}
             {achievements.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
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
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            {projects.map(proj => <li key={proj.name}>{proj.name}</li>)}
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
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            {voluntaryWorks.map(work => <li key={work.name}>{work.name}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
        <div className="lg:col-span-1 grid gap-6">
            {(github || linkedin) && (
                <Card>
                    <CardHeader>
                        <CardTitle>Professional Links</CardTitle>
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
            )}
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>
                    Manage your tasks and stay on top of your coursework.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Due</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deadlines.map((deadline, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="font-medium">{deadline.task}</div>
                                <div className="text-xs text-muted-foreground">{deadline.course}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={deadline.status === 'Upcoming' ? 'default' : 'destructive'}>{deadline.due}</Badge>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
       <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
            <CardDescription>
              A summary of your submitted documents for experience, internships, courses, and achievements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={doc.status === 'Approved' ? 'default' : 'destructive'} className="flex items-center gap-1.5 w-fit ml-auto">
                        {doc.status === 'Approved' ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                        {doc.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
