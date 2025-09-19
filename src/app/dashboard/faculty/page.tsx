
"use client";

import { useState } from "react";
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
import { University, Users, Calendar, Check, X, FileCheck, FileClock } from "lucide-react";
import { getPendingDocuments } from "@/lib/student-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const stats = [
    { title: "Classes Taught", value: "4", icon: <University className="h-6 w-6 text-muted-foreground" /> },
    { title: "Total Students", value: "112", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "Office Hours This Week", value: "6", icon: <Calendar className="h-6 w-6 text-muted-foreground" /> },
];

const classes = [
    { code: "CS 450", name: "Advanced Algorithms", students: 35, semester: "Fall 2024" },
    { code: "CS 210", name: "Data Structures", students: 42, semester: "Fall 2024" },
    { code: "CS 555", name: "Machine Learning", students: 20, semester: "Fall 2024" },
    { code: "CS 101", name: "Intro to Programming", students: 15, semester: "Fall 2024" },
];

type Document = ReturnType<typeof getPendingDocuments>[0];

export default function FacultyDashboard() {
  const { toast } = useToast();
  const [pendingDocs, setPendingDocs] = useState(getPendingDocuments());

  const handleApproval = (docToUpdate: Document, status: "Approved" | "Rejected") => {
    setPendingDocs(currentDocs => currentDocs.filter(doc => doc.name !== docToUpdate.name));
    
    toast({
      title: `Document ${status}`,
      description: `"${docToUpdate.name}" from ${docToUpdate.student} has been ${status.toLowerCase()}.`,
    });
  }

  return (
    <>
      <PageHeader title="Faculty Dashboard" description="Your teaching and student overview." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
             <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">Current Semester</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>
              A list of your currently assigned classes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead className="text-right">Enrolled Students</TableHead>
                  <TableHead>Semester</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((c, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{c.code}</TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell className="text-right">{c.students}</TableCell>
                    <TableCell>{c.semester}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileClock className="h-5 w-5" /> Pending Document Approvals</CardTitle>
            <CardDescription>
              Review and approve or reject student-submitted documents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingDocs.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingDocs.map((doc) => (
                        <TableRow key={doc.name}>
                            <TableCell>
                                 <div className="font-medium">{doc.student}</div>
                                <div className="text-xs text-muted-foreground">{doc.date}</div>
                            </TableCell>
                            <TableCell>
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    <Badge variant="outline">{doc.type}</Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleApproval(doc, "Approved")}>
                                        <Check className="h-4 w-4 mr-1" /> Approve
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleApproval(doc, "Rejected")}>
                                        <X className="h-4 w-4 mr-1" /> Reject
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                    <FileCheck className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground mt-4">No pending documents to review.</p>
                </div>
            )}
           
          </CardContent>
        </Card>
      </div>
    </>
  );
}
