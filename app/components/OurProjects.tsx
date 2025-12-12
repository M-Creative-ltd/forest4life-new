import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
interface OurProjectsProps {
  title: string;
  intro: string;
  featuredProjects?: Array<{
    slug: string;
    title: string;
    summary: string;
    status: string;
    district: string;
    start_date: string;
    impact_metrics?: {
      hectares_restored?: number;
      trees_planted?: number;
      farmers_trained?: number;
    };
  }>;
}

const OurProjects = ({ title, intro, featuredProjects = [] }: OurProjectsProps) => {
  const getStatusVariant = (status: string) => {
    if (status === "published" || status === "ongoing") return "default";
    if (status === "completed") return "secondary";
    return "outline";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{intro}</p>
        </div>

        {featuredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {featuredProjects.map((project) => (
                <Card key={project.slug} className="card-hover group">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge variant={getStatusVariant(project.status)} className="shrink-0">
                        {project.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(project.start_date)}
                      </div>
                    </div>
                    
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{project.district}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{project.summary}</p>

                    {project.impact_metrics && (
                      <div className="space-y-3">
                        {project.impact_metrics.trees_planted && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Trees Planted:</span>
                            <span className="text-sm text-primary font-semibold">
                              {project.impact_metrics.trees_planted.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {project.impact_metrics.hectares_restored && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Hectares:</span>
                            <span className="text-sm text-primary font-semibold">
                              {project.impact_metrics.hectares_restored}
                            </span>
                          </div>
                        )}
                        {project.impact_metrics.farmers_trained && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Farmers Trained:</span>
                            <span className="text-sm text-primary font-semibold">
                              {project.impact_metrics.farmers_trained}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <Link href={`/project/${project.slug}`}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Link href="/project">
                <Button variant="hero" size="lg" className="group">
                  See Our Impact
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-muted/50 rounded-xl p-8 mb-8">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">More Projects Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                This section will dynamically load projects from our database as we expand our impact.
              </p>
              <Link href="/project">
                <Button variant="hero">
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProjects;