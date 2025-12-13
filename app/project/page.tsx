import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import ProjectListClient from "./ProjectListClient";
import { Badge } from "@/components/ui/badge";
import { TreePine } from "lucide-react";
import { reader } from "../reader";

export default async function ProjectsPage() {
  // Fetch all projects from Keystatic
  const allProjects = await reader.collections.projects.all();

  // Transform projects to match the client component interface
  const projects = await Promise.all(
    allProjects.map(async (projectEntry) => {
      const project = projectEntry.entry;
      const slug = projectEntry.slug;
      
      // Transform impact_metrics array to object format for components
      const impactMetricsObj: {
    trees_planted?: number;
    hectares_restored?: number;
    farmers_trained?: number;
        [key: string]: number | undefined;
      } = {};
      
      if (project.impact_metrics && Array.isArray(project.impact_metrics)) {
        project.impact_metrics.forEach((metric) => {
          if (!metric.label || metric.value === undefined || metric.value === null) return;
          
          const normalizedLabel = metric.label.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '');
          
          const labelMap: Record<string, string> = {
            'trees_planted': 'trees_planted',
            'trees': 'trees_planted',
            'hectares_restored': 'hectares_restored',
            'hectares': 'hectares_restored',
            'farmers_trained': 'farmers_trained',
            'farmers': 'farmers_trained',
          };
          
          const key = labelMap[normalizedLabel] || normalizedLabel;
          impactMetricsObj[key] = metric.value;
        });
      }
      
      return {
        slug: slug,
        title: project.title,
        summary: project.summary || "",
        status: project.status || "draft",
        district: project.district || project.location || "",
        start_date: project.start_date || "",
        end_date: project.end_date || undefined,
        impact_metrics: impactMetricsObj,
      };
    })
  );

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 section-padding">
          <div className="container-width">
            <div className="text-center">
              <Badge className="mb-6 text-sm px-4 py-2">
                <TreePine className="h-4 w-4 mr-2" />
                Our Projects
              </Badge>
              <h1 className="hero-text mb-8">
                Transforming Communities Through Action
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
                Discover our ongoing and completed projects that are making a real difference 
                in forest restoration and community empowerment across Rwanda.
              </p>
            </div>
          </div>
        </section>

        {/* Project List with Search/Filter */}
        <ProjectListClient projects={projects} />

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container-width text-center">
            <h2 className="mb-6 text-white">Want to Support Our Projects?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Every project creates lasting impact for communities and the environment. 
              Join us in making a difference through forest restoration and sustainable development.
            </p>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}
