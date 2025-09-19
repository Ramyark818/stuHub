import { PageHeader } from "@/components/page-header";
import { UploadForm } from "@/components/upload-form";

export default function UploadPage() {
  return (
    <>
      <PageHeader
        title="Upload & Assess Records"
        description="Submit your academic documents for an AI-driven analysis of your progress."
      />
      <UploadForm />
    </>
  );
}
