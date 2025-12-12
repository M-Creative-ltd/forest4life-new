import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";

interface OurServicesProps {
  title: string;
  intro: string;
  featuredServices?: Array<{
    slug: string;
    title: string;
    short_description: string;
    icon?: string;
  }>;
}

const OurServices = ({ title, intro, featuredServices = [] }: OurServicesProps) => {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{intro}</p>
        </div>

        {featuredServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
              {featuredServices.map((service) => {
                return (
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
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">{service.short_description}</p>

                      <Link href={`/services/${service.slug}`}>
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="text-center">
              <Link href="/services">
                <Button variant="hero" size="lg" className="group">
                  View All Programs
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center mb-12">
            <p className="text-muted-foreground">No programs available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurServices;