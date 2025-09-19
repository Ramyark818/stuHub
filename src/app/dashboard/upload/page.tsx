import { PageHeader } from "@/components/page-header";
import { UploadForm } from "@/components/upload-form";
import { FacultyApprovalUploadForm } from "@/components/faculty-approval-upload-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UploadPage() {
  return (
    <>
      <PageHeader
        title="Upload Records"
        description="Submit your academic documents for AI analysis or faculty approval."
      />
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Transcript Overview</CardTitle>
            <CardDescription>
              Submit your academic transcript for an automated, AI-driven analysis of your progress, GPA, and areas for improvement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadForm />
          </CardContent>
        </Card>

        <Separator />

        <Card>
           <CardHeader>
            <CardTitle>Submit Document for Faculty Approval</CardTitle>
            <CardDescription>
              Upload supporting documents for your experiences, achievements, or other records to be officially approved and added to your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FacultyApprovalUploadForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
