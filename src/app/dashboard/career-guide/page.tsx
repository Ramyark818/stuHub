
import { PageHeader } from "@/components/page-header";
import { CareerGuideForm } from "@/components/career-guide-form";

export default function CareerGuidePage() {
  return (
    <>
      <PageHeader
        title="AI Career Guide"
        description="Get personalized career suggestions based on your interests and skills."
      />
      <CareerGuideForm />
    </>
  );
}
