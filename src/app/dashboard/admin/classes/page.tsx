import {
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";

const classes = [
  {
    code: "CS 450",
    name: "Advanced Algorithms",
    faculty: "Dr. Alan Turing",
    students: 35,
    status: "Active",
  },
  {
    code: "MA 321",
    name: "Real Analysis",
    faculty: "Dr. Emmy Noether",
    students: 28,
    status: "Active",
  },
  {
    code: "PH 210",
    name: "Modern Physics",
    faculty: "Dr. Marie Curie",
    students: 42,
    status: "Active",
  },
  {
    code: "CH 101",
    name: "General Chemistry",
    faculty: "Dr. Rosalind Franklin",
    students: 55,
    status: "Inactive",
  },
  {
    code: "EN 101",
    name: "Academic Writing",
    faculty: "Dr. Virginia Woolf",
    students: 30,
    status: "Active",
  },
];

export default function AdminClassesPage() {
  return (
    <>
      <PageHeader title="Class Management" description="Oversee all courses offered on the platform.">
         <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Class
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Classes</CardTitle>
          <CardDescription>
            A list of all classes in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((c) => (
                <TableRow key={c.code}>
                  <TableCell>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">{c.code}</div>
                  </TableCell>
                  <TableCell>{c.faculty}</TableCell>
                  <TableCell className="text-center">{c.students}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === 'Active' ? 'default' : 'outline'}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Roster</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
