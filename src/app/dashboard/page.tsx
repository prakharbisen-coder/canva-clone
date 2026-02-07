// Authentication removed - dashboard is publicly accessible
import { Banner } from "../(dashboard)/banner";
import { ProjectsSection } from "../(dashboard)/projects-section";
import { TemplatesSection } from "../(dashboard)/templates-section";

export default async function DashboardPage() {
  // No authentication check - publicly accessible

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
