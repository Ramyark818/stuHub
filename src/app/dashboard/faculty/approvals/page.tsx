
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
import { Check, X, FileCheck } from "lucide-react";
import { getPendingDocuments } from "@/lib/student-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type Document = ReturnType<typeof getPendingDocuments>[0];

export default function DocumentApprovalPage() {
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
      <PageHeader title="Document Approvals" description="Review and approve or reject student-submitted documents." />
       <Card>
        <CardHeader>
          <CardTitle>Pending Submissions</CardTitle>
          <CardDescription>
            The following documents are awaiting your review.
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
              <div className="flex flex-col items-center justify-center h-64 text-center">
                  <FileCheck className="h-16 w-16 text-muted-foreground/50" />
                  <p className="text-muted-foreground mt-4 text-lg">No pending documents to review.</p>
                  <p className="text-sm text-muted-foreground">All caught up!</p>
              </div>
          )}
         
        </CardContent>
      </Card>
    </>
  );
}

