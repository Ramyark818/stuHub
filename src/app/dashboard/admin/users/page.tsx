import {
  MoreHorizontal,
  PlusCircle,
  User,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    name: "Liam Johnson",
    email: "liam@example.com",
    role: "Student",
    avatar: "https://picsum.photos/seed/liam/40/40",
    date: "2023-06-23",
  },
  {
    name: "Olivia Smith",
    email: "olivia@example.com",
    role: "Faculty",
    avatar: "https://picsum.photos/seed/olivia/40/40",
    date: "2023-05-15",
  },
  {
    name: "Noah Williams",
    email: "noah@example.com",
    role: "Student",
    avatar: "https://picsum.photos/seed/noah/40/40",
    date: "2023-08-02",
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    role: "Admin",
    avatar: "https://picsum.photos/seed/emma/40/40",
    date: "2023-04-10",
  },
  {
    name: "James Jones",
    email: "james@example.com",
    role: "Student",
    avatar: "https://picsum.photos/seed/james/40/40",
    date: "2023-09-19",
  },
];

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader title="User Management" description="View, add, and manage all users on the platform.">
        <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add User
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            A list of all users in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Registered On</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <div className="font-medium">
                            <div>{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'destructive' : (user.role === 'Faculty' ? 'secondary' : 'outline')}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.date}</TableCell>
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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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
