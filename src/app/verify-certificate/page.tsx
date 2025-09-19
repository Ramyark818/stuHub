"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Search, XCircle } from "lucide-react";
import { Logo } from "@/components/logo";

type VerificationStatus = 'idle' | 'loading' | 'verified' | 'not_found';
type CertificateData = {
  id: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  issuer: string;
};

const dummyCertificate: CertificateData = {
  id: 'UC-123-456-789',
  studentName: 'Jane Doe',
  courseName: 'Advanced Quantum Computing',
  issueDate: '2023-05-20',
  issuer: 'University of Innovation',
};

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState("");
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [foundCertificate, setFoundCertificate] = useState<CertificateData | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFoundCertificate(null);

    setTimeout(() => {
      if (certificateId.trim().toUpperCase() === dummyCertificate.id) {
        setStatus('verified');
        setFoundCertificate(dummyCertificate);
      } else {
        setStatus('not_found');
      }
    }, 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <div className="flex-1 text-right">
             <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Certificate</CardTitle>
            <CardDescription>
              Enter the certificate ID to verify its authenticity.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSearch}>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="certificate-id">Certificate ID</Label>
                <div className="relative">
                  <Input
                    id="certificate-id"
                    placeholder="e.g., UC-123-456-789"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    required
                  />
                  <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" disabled={status === 'loading'}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </form>
        </Card>

        {status === 'loading' && (
          <div className="mt-8 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Verifying...</span>
          </div>
        )}

        {status === 'verified' && foundCertificate && (
          <Card className="w-full max-w-md mt-8 animate-in fade-in">
            <CardHeader className="flex flex-row items-center gap-4 bg-green-100 dark:bg-green-900/20 rounded-t-lg">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                <div>
                    <CardTitle className="text-green-800 dark:text-green-300">Certificate Verified</CardTitle>
                    <CardDescription className="text-green-700 dark:text-green-400">This certificate is authentic.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 gap-4">
                <div><Label>Student Name</Label><p>{foundCertificate.studentName}</p></div>
                <div><Label>Course</Label><p>{foundCertificate.courseName}</p></div>
                <div><Label>Certificate ID</Label><p className="font-mono">{foundCertificate.id}</p></div>
                <div><Label>Issue Date</Label><p>{foundCertificate.issueDate}</p></div>
                <div className="col-span-2"><Label>Issuer</Label><p>{foundCertificate.issuer}</p></div>
            </CardContent>
          </Card>
        )}

         {status === 'not_found' && (
           <Card className="w-full max-w-md mt-8 animate-in fade-in">
             <CardHeader className="flex flex-row items-center gap-4 bg-red-100 dark:bg-red-900/20 rounded-t-lg">
                 <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                 <div>
                     <CardTitle className="text-red-800 dark:text-red-300">Verification Failed</CardTitle>
                     <CardDescription className="text-red-700 dark:text-red-400">Certificate not found.</CardDescription>
                 </div>
             </CardHeader>
             <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">The certificate ID you entered does not match any records in our database. Please check the ID and try again.</p>
             </CardContent>
           </Card>
        )}
      </div>
       <footer className="py-6 border-t">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} UniTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
