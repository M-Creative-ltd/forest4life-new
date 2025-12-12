"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sprout, Calendar, Users } from "lucide-react";

interface Service {
  slug: string;
  title: string;
  short_description: string;
  cover_image?: string;
  icon?: string;
  beneficiaries?: string;
  date_created?: string;
  date_updated?: string;
}

interface ServiceListClientProps {
  services: Service[];
}

export default function ServiceListClient({ services: initialServices }: ServiceListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = initialServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (service.beneficiaries && service.beneficiaries.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const featuredServices = initialServices.slice(0, 2);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <>
      {featuredServices.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="mb-12">
              <h2 className="mb-6">Featured Programs</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Our flagship programs demonstrating innovative approaches to environmental restoration and community development.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredServices.map((service) => (
                <Card key={service.slug} className="card-hover overflow-hidden">
                  {service.cover_image ? (
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={service.cover_image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Sprout className="h-16 w-16 text-primary/60" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      {service.icon && (
                        <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-lg w-12 h-12 flex items-center justify-center relative">
                          <Image
                            src={service.icon}
                            alt={service.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      )}
                      <CardTitle className="flex-1">{service.title}</CardTitle>
                    </div>
                    {service.beneficiaries && (
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Users className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{service.beneficiaries}</span>
                      </div>
                    )}
                    {service.date_created && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="text-sm">Created {formatDate(service.date_created)}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.short_description}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="mb-12">
            <h2 className="mb-6">All Programs</h2>
            
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.slug} className="card-hover group h-full">
                <CardHeader className="text-center space-y-4">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-xl w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                    {service.icon ? (
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <Sprout className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {service.title}
                  </CardTitle>
                  {service.beneficiaries && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 shrink-0" />
                      <span className="text-sm text-center">{service.beneficiaries}</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {service.short_description}
                  </p>

                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Link href={`/services/${service.slug}`}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No programs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
