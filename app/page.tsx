import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import OurProjects from "@/components/OurProjects";
import OurServices from "@/components/OurServices";
import { reader } from "./reader";

export default async function HomePage() {
  const home = await reader.singletons.home.read();

  if (!home) {
    return (
      <div className="min-h-screen">
        <HeaderWrapper />
        <main className="container-width py-12">
          <p>Homepage content not found. Please configure it in Keystatic admin.</p>
        </main>
        <FooterWrapper />
      </div>
    );
  }

  // Resolve featured projects from relationships
  const featuredProjects = await Promise.all(
    (home.projectsIntro.featured_projects || [])
      .filter((slug): slug is string => Boolean(slug))
      .map(async (slug) => {
      const project = await reader.collections.projects.read(slug);
      if (!project) return null;

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
          impact_metrics: impactMetricsObj,
      };
    })
  ).then(projects => projects.filter((p): p is NonNullable<typeof p> => p !== null));

  // Resolve featured services from relationships
  const featuredServices = await Promise.all(
    (home.servicesIntro.featured_services || [])
      .filter((slug): slug is string => Boolean(slug))
      .map(async (slug) => {
      const service = await reader.collections.services.read(slug);
      if (!service) return null;
      return {
        slug: slug,
        title: service.title,
        short_description: service.short_description || "",
        icon: service.icon || undefined,
      };
    })
  ).then(services => services.filter((s): s is NonNullable<typeof s> => s !== null));

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <main>
        <Hero
          title={home.hero.title}
          highlightedPhrase={home.hero.highlightedPhrase}
          subtitle={home.hero.subtitle}
          backgroundImage={home.hero.backgroundImage || "/images/projects/trial-of-this-project/hero_image.jpg"}
          stats={home.hero.stats || []}
          primaryCTA={home.hero.primaryCTA}
          secondaryCTA={home.hero.secondaryCTA}
        />
        <WhoWeAre
          title={home.whoWeAre.title}
          paragraphs={home.whoWeAre.paragraphs || []}
          keyValues={home.whoWeAre.keyValues || []}
          mission={home.whoWeAre.mission}
        />
        <OurProjects
          title={home.projectsIntro.title}
          intro={home.projectsIntro.intro}
          featuredProjects={featuredProjects}
        />
        <OurServices
          title={home.servicesIntro.title}
          intro={home.servicesIntro.intro}
          featuredServices={featuredServices}
        />
      </main>
      <FooterWrapper />
    </div>
  );
}
