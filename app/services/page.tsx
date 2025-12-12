import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import ServiceListClient from "./ServiceListClient";
import { Badge } from "@/components/ui/badge";
import { Sprout } from "lucide-react";
import { reader } from "../reader";

export default async function ServicesPage() {
  // Fetch all services from Keystatic
  const allServices = await reader.collections.services.all();

  // Transform services to match the client component interface
  const services = await Promise.all(
    allServices.map(async (serviceEntry) => {
      const service = serviceEntry.entry;
      const slug = serviceEntry.slug;
      
      return {
        slug: slug,
        title: service.title,
        short_description: service.short_description || "",
        cover_image: service.cover_image || undefined,
        icon: service.icon || undefined,
        beneficiaries: service.beneficiaries || undefined,
        date_created: service.date_created || undefined,
        date_updated: service.date_updated || undefined,
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
                <Sprout className="h-4 w-4 mr-2" />
                Our Programs
              </Badge>
              <h1 className="hero-text mb-8">
                Comprehensive Solutions for Sustainable Growth
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
                Discover our integrated services that address environmental restoration,
                agricultural sustainability, and community empowerment across Rwanda.
              </p>
            </div>
          </div>
        </section>

        {/* Service List with Search/Filter */}
        <ServiceListClient services={services} />

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container-width text-center">
            <h2 className="mb-6 text-white">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Join us in our mission to restore Rwanda's forests and empower communities
              through sustainable practices and environmental education.
            </p>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}
