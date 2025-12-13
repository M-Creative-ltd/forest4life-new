import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { reader } from "../reader";
import React from 'react';

export default async function AboutPage() {
  const about = await reader.singletons.about.read();

  if (!about) {
    notFound();
  }

  // Resolve partner relationships
  const resolvedPartners = await Promise.all(
    (about.partners.partnerList || [])
      .filter((slug): slug is string => slug !== null && slug !== undefined)
      .map(async (partnerSlug) => {
        const partner = await reader.collections.partners.read(partnerSlug);
        if (!partner) return null;
        return {
          name: partner.name,
          logo: partner.logo || undefined,
        };
      })
  ).then(partners => partners.filter((p): p is NonNullable<typeof p> => p !== null));

  const renderIcon = (iconValue: string | null | undefined, defaultIcon: React.ComponentType<{ className?: string }>) => {
    const DefaultIcon = defaultIcon;
    
    if (!iconValue) {
      return <DefaultIcon className="h-8 w-8 text-primary" />;
    }

    // Check if it's an image path
    if (iconValue.startsWith('/') || iconValue.startsWith('http')) {
    return (
        <Image
          src={iconValue}
          alt="Icon"
          fill
          className="object-contain p-3"
        />
    );
  }

    // Try to resolve Lucide icon
    const IconComponent = (Icons[iconValue as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || DefaultIcon;
    return <IconComponent className="h-8 w-8 text-primary" />;
  };

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 section-padding">
          <div className="container-width">
            <div className="text-center">
              <h1 className="hero-text mb-8">{about.hero.title}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
                {about.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="default" size="lg">
                    Get Involved
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="mb-6">Our Story</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  {about.story.paragraphs && about.story.paragraphs.length > 0 ? (
                    about.story.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                    ))
                  ) : (
                    <p>Story content is being prepared. Please check back soon.</p>
                  )}
                </div>
              </div>
              <div className="relative">
                {about.story.image ? (
                  <Image
                    src={about.story.image}
                    alt="Our Story"
                    width={600}
                    height={450}
                    className="rounded-2xl"
                  />
                ) : (
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                    <Icons.TreePine className="h-24 w-24 text-primary/60" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="mb-6">{about.values.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {about.values.intro}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.values.values.map((value, index) => {
                return (
                  <Card key={index} className="card-hover text-center">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                        {renderIcon(value.icon, Icons.TreePine)}
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="mb-6">{about.team.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {about.team.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about.team.members.map((member, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardHeader>
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="mx-auto w-24 h-24 rounded-full object-cover mb-4"
                      />
                    ) : (
                      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
                        <Icons.Users className="h-12 w-12 text-primary/60" />
                      </div>
                    )}
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="section-padding bg-primary/5">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="mb-6">{about.impactMetrics.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {about.impactMetrics.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {about.impactMetrics.metrics.map((metric, index) => {
                return (
                  <Card key={index} className="card-hover text-center">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                        {renderIcon(metric.icon, Icons.BarChart)}
                      </div>
                      <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                      <CardTitle className="text-lg">{metric.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {metric.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="mb-6">{about.partners.title}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {about.partners.intro}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {resolvedPartners.map((partner, index) => (
                <div key={index} className="flex items-center justify-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Annual Reports Section */}
        {about.annual_reports && about.annual_reports.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container-width">
              <div className="text-center mb-12">
                <h2 className="mb-6">Annual Reports</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Transparency and accountability are core to our mission. Access our annual reports to see our impact and financial stewardship.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {about.annual_reports.map((report, index) => (
                  <Card key={index} className="card-hover">
                    <CardHeader>
                      <CardTitle className="text-xl">{report.year} Annual Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {report.summary && (
                        <p className="text-sm text-muted-foreground">{report.summary}</p>
                      )}
                      {report.file && (
                        <Link href={report.file} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="w-full">
                            Download PDF
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container-width text-center">
            <h2 className="mb-6 text-white">{about.finalCTA.heading}</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              {about.finalCTA.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}
