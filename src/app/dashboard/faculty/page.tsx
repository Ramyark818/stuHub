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
import { University, Users, Calendar } from "lucide-react";

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

export default function FacultyDashboard() {
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
      <div className="mt-6">
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
      </div>
    </>
  );
}
