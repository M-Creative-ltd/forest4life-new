import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Sprout,
  Users,
  Calendar,
  Target,
} from "lucide-react";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { reader } from "../../reader";
import Markdoc from '@markdoc/markdoc';
import React from 'react';

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const service = await reader.collections.services.read(slug);

  if (!service) {
    notFound();
  }

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
                <Link href="/services">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Programs
                </Link>
              </Button>
            </div>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {service.beneficiaries && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{service.beneficiaries}</span>
                  </div>
                )}
                {service.date_created && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Created {formatDate(service.date_created)}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                {service.icon && (
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl w-20 h-20 flex items-center justify-center relative shrink-0">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
                <h1 className="text-4xl font-bold lg:text-5xl flex-1">{service.title}</h1>
              </div>
              
              {service.short_description && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {service.short_description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {service.cover_image && (
          <section className="section-padding bg-background">
            <div className="container-width">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={service.cover_image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Service Content */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                {service.description && (
                  <>
                    <section>
                      <h2 className="mb-6">About This Program</h2>
                      <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(service.description)}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Goals */}
                {service.goals && (
                  <>
                    <section>
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="h-6 w-6 text-primary" />
                        <h2>Program Goals</h2>
                      </div>
                      <div className="prose prose-lg max-w-none text-muted-foreground">
                        {renderMarkdocContent(service.goals)}
                      </div>
                    </section>
                    <Separator />
                  </>
                )}

                {/* Gallery */}
                {service.gallery && service.gallery.length > 0 && (
                  <section>
                    <h2 className="mb-6">Gallery</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {service.gallery.map((item, index) => (
                        <div key={index} className="space-y-2">
                          {item.image && (
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                              <Image
                                src={item.image}
                                alt={item.caption || `Gallery image ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          {item.caption && (
                            <p className="text-sm text-muted-foreground text-center">
                              {item.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Program Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {service.beneficiaries && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Beneficiaries
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{service.beneficiaries}</span>
                        </div>
                      </div>
                    )}
                    {service.date_created && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Created
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{formatDate(service.date_created)}</span>
                        </div>
                      </div>
                    )}
                    {service.date_updated && service.date_updated !== service.date_created && (
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Last Updated
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{formatDate(service.date_updated)}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                  <CardHeader>
                    <CardTitle>Get Involved</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Interested in this program? Contact us to learn more about how you can participate or support our work.
                    </p>
                    <Button asChild variant="default" className="w-full">
                      <Link href="/contact">
                        Contact Us
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container-width text-center">
            <h2 className="mb-6 text-white">Explore More Programs</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Discover other programs that are making a difference in environmental restoration and community empowerment.
            </p>
            <Button asChild variant="hero-outline" size="lg">
              <Link href="/services">
                View All Programs
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.services.list();

  return slugs.map(slug => ({
    slug,
  }));
}
