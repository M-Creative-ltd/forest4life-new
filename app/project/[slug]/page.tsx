import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowLeft, 
  TreePine, 
  Target, 
  FileText, 
  Download,
  ExternalLink,
  Clock,
  Globe
} from "lucide-react";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { reader } from "../../reader";
import Markdoc from '@markdoc/markdoc';
import React from 'react';

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const project = await reader.collections.projects.read(slug);

  if (!project) {
    notFound();
  }

  console.log(project);
  console.log(project.background);
  // Resolve contact person relationship
  const contactPerson = project.contact_person
    ? await reader.collections.authors.read(project.contact_person)
    : null;

  // Resolve partner relationships
  const resolvedPartners = await Promise.all(
    (project.linked_partners || [])
      .filter((p): p is { partner: string; role: string } =>
        p !== null && p !== undefined && typeof p === 'object' && 'partner' in p && p.partner !== null
      )
      .map(async (linkedPartner) => {
        const partner = await reader.collections.partners.read(linkedPartner.partner);
        if (!partner) return null;
        return {
          name: partner.name,
          role: linkedPartner.role || '',
          website: partner.website || undefined,
        };
      })
  ).then(partners => partners.filter((p): p is NonNullable<typeof p> => p !== null));

  // Transform impact_metrics array to object format for display
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "completed": return "secondary";
      case "ongoing": return "default";
      case "planned": return "outline";
      default: return "outline";
    }
  };

  const formatNumber = (num?: number) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  // Helper to render markdoc content
  const renderMarkdocContent = async (content: any) => {
    if (!content) return null;
  
    try {
      // 1. Resolve the Keystatic async function if necessary
      const data = typeof content === 'function' ? await content() : content;
  
      // 2. Handle String (Raw Markdown)
      if (typeof data === 'string') {
        const ast = Markdoc.parse(data);
        const renderable = Markdoc.transform(ast);
        return Markdoc.renderers.react(renderable, React);
      }
  
      // 3. Handle Keystatic Document Object (AST)
      // Keystatic returns an object with a 'node' property for Markdoc
      if (typeof data === 'object') {
        const node = data.node || data; 
        const renderable = Markdoc.transform(node);
        return Markdoc.renderers.react(renderable, React);
      }
    } catch (e) {
      console.error("Error rendering markdoc:", e);
    }
  
    return <p className="text-muted-foreground">Content unavailable.</p>;
  };

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 section-padding">
          <div className="container-width">
            <div className="mb-6">
              <Button asChild variant="outline" size="sm">
                <Link href="/project">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Link>
              </Button>
            </div>
            
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <Badge variant={getStatusColor(project.status) as any}>
                  {project.status}
                </Badge>
                {(project.district || project.location) && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                    <span>{project.district || project.location}</span>
                    {project.region && `, ${project.region}`}
                </div>
                )}
                {project.start_date && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(project.start_date).getFullYear()}
                    {project.end_date && ` - ${new Date(project.end_date).getFullYear()}`}
                  </span>
                </div>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-6 lg:text-5xl">{project.title}</h1>
              {project.summary && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.summary}
              </p>
              )}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {project.hero_image && (
          <section className="section-padding bg-background">
            <div className="container-width">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src={project.hero_image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Impact Metrics */}
        {Object.keys(impactMetricsObj).length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {impactMetricsObj.trees_planted !== undefined && (
              <Card className="text-center">
                <CardHeader>
                  <TreePine className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary">
                        {formatNumber(impactMetricsObj.trees_planted)}
                  </div>
                  <CardTitle className="text-lg">Trees Planted</CardTitle>
                </CardHeader>
              </Card>
                )}
              
                {impactMetricsObj.hectares_restored !== undefined && (
              <Card className="text-center">
                <CardHeader>
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary">
                        {formatNumber(impactMetricsObj.hectares_restored)}
                  </div>
                  <CardTitle className="text-lg">Hectares Restored</CardTitle>
                </CardHeader>
              </Card>
                )}
              
                {impactMetricsObj.farmers_trained !== undefined && (
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary">
                        {formatNumber(impactMetricsObj.farmers_trained)}
                  </div>
                  <CardTitle className="text-lg">Farmers Trained</CardTitle>
                </CardHeader>
              </Card>
                )}
              </div>
            </div>
          </section>
        )}

            {/* Project Content */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Executive Summary */}
                {project.executive_summary && (
                  <>
                <section>
                  <h2 className="mb-6">Executive Summary</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>{project.executive_summary}</p>
                  </div>
                </section>
                <Separator />
                  </>
                )}

                {/* Background */}
                {project.background && (
                  <>
                <section>
                  <h2 className="mb-6">Background</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(project.background)}
                  </div>
                </section>
                <Separator />
                  </>
                )}

                {/* Objectives */}
                {project.objectives && (
                  <>
                <section>
                  <h2 className="mb-6">Objectives</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(project.objectives)}
                  </div>
                </section>
                <Separator />
                  </>
                )}

                {/* Methodology */}
                {project.methodology && (
                  <>
                <section>
                  <h2 className="mb-6">Methodology</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(project.methodology)}
                  </div>
                </section>
                    <Separator />
                  </>
                )}

                {/* Key Findings */}
                {project.key_findings && (
                  <>
                    <section>
                      <h2 className="mb-6">Key Findings</h2>
                      <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(project.key_findings)}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Conclusions */}
                {project.conclusions && (
                  <>
                    <section>
                      <h2 className="mb-6">Conclusions</h2>
                      <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(project.conclusions)}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Recommendations */}
                {project.recommendations && (
                  <>
                    <section>
                      <h2 className="mb-6">Recommendations</h2>
                      <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(project.recommendations)}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Timeline */}
                {project.timeline && project.timeline.length > 0 && (
                  <>
                <section>
                  <h2 className="mb-6">Project Timeline</h2>
                  <div className="space-y-6">
                    {project.timeline.map((phase, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{phase.label}</CardTitle>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                                  {phase.from_date ? new Date(phase.from_date).getFullYear() : ''}
                                  {phase.to_date ? ` - ${new Date(phase.to_date).getFullYear()}` : ''}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{phase.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
                    <Separator />
                  </>
                )}

                {/* Activities */}
                {project.activities && project.activities.length > 0 && (
                  <>
                <section>
                  <h2 className="mb-6">Recent Activities</h2>
                  <div className="space-y-4">
                    {project.activities.map((activity, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{activity.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusColor(activity.status) as any}>
                                {activity.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                    {formatDate(activity.date)}
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{activity.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
                    <Separator />
                  </>
                )}

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <section>
                      <h2 className="mb-6">Project Gallery</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {project.gallery.map((image, index) => (
                          <Card key={index} className="overflow-hidden">
                          {image.image ? (
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={image.image}
                                alt={image.alt_text || image.caption || `Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                              <TreePine className="h-16 w-16 text-primary/60" />
                            </div>
                          )}
                            <CardContent className="p-4">
                            {image.caption && (
                              <p className="text-sm text-muted-foreground">{image.caption}</p>
                            )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Project Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Status</div>
                      <Badge variant={getStatusColor(project.status) as any}>
                        {project.status}
                      </Badge>
                    </div>
                    {(project.district || project.location) && (
                    <div>
                      <div className="text-sm font-medium mb-1">Location</div>
                      <div className="text-sm text-muted-foreground">
                          {project.district || project.location}
                          {project.region && `, ${project.region}`}
                          {project.country && `, ${project.country}`}
                    </div>
                      </div>
                    )}
                    {project.start_date && (
                      <div>
                        <div className="text-sm font-medium mb-1">Duration</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(project.start_date)}
                          {project.end_date && ` - ${formatDate(project.end_date)}`}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Contact Person */}
                {contactPerson && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Project Contact
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="font-medium">{contactPerson.full_name}</div>
                        {contactPerson.bio && (
                          <div className="text-sm text-muted-foreground">{contactPerson.bio}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Partners */}
                {resolvedPartners.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Project Partners
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {resolvedPartners.map((partner, index) => (
                      <div key={index} className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{partner.name}</div>
                            {partner.role && (
                          <div className="text-sm text-muted-foreground">{partner.role}</div>
                            )}
                        </div>
                        {partner.website && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={partner.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
                )}

                {/* Documents */}
                {project.documents && project.documents.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Project Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {project.documents.map((doc, index) => {
                        const docUrl = doc.file || doc.url;
                        if (!docUrl) return null;

                        return (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">{doc.name}</div>
                              {(doc.type || doc.size) && (
                            <div className="text-xs text-muted-foreground">
                                  {doc.type && `${doc.type}`}
                                  {doc.type && doc.size && ' • '}
                                  {doc.size && formatFileSize(doc.size)}
                            </div>
                              )}
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                              <a href={docUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container-width text-center">
            <h2 className="mb-6 text-white">Interested in This Project?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Learn more about how you can support or get involved in this impactful forest restoration initiative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                Support This Project
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                Contact Project Team
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.projects.list();

  return slugs.map(slug => ({
    slug,
  }));
}
