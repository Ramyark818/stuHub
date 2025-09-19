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
import { Star, Book, Clock } from "lucide-react";

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
      <div className="mt-6">
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
                  <TableHead>Course</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deadlines.map((deadline, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{deadline.course}</TableCell>
                    <TableCell>{deadline.task}</TableCell>
                    <TableCell>{deadline.due}</TableCell>
                    <TableCell>
                      <Badge variant={deadline.status === 'Upcoming' ? 'default' : 'destructive'}>{deadline.status}</Badge>
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
