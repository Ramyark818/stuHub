import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Database, Bot, CheckCircle, User, Users, BookOpenCheck } from "lucide-react";
import { Logo } from "@/components/logo";

const features = [
  {
    icon: <User className="h-8 w-8 text-primary" />,
    title: "Role-Based Dashboards",
    description: "Custom dashboards for Students, Faculty, and Admins with relevant quick stats and overviews.",
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Data Upload & Management",
    description: "Easily upload and manage academic records and related documentation.",
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "AI Student Assistant",
    description: "Get instant help with our AI-powered chat agent for all your inquiries.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Certificate Verification",
    description: "Quickly verify the authenticity of academic certificates with a simple search.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "User & Class Control",
    description: "Comprehensive admin interfaces for managing users, classes, and enrollment.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Profile Management",
    description: "View and edit your profile details with ease, keeping your information up-to-date.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 sm:py-24 md:py-32 lg:py-40">
          <div className="container px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                Centralised Digital System for Student Activity
              </h1>
              <p className="text-lg text-muted-foreground">
                StuHub is the all-in-one platform for students, faculty, and administrators to streamline academic processes and enhance collaboration.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">View Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-12 sm:py-24 bg-secondary">
          <div className="container px-4">
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Features for Everyone</h2>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Powerful tools designed for every role in your institution.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StuHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/verify-certificate" className="text-sm hover:underline">Verify Certificate</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
