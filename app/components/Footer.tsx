"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Leaf,
  ArrowRight
} from "lucide-react";

interface FooterProps {
  organizationName?: string;
  description?: string;
  logo?: string;
  tags?: string[] | readonly string[];
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string | null;
  }> | readonly {
    platform: string;
    url: string | null;
  }[];
  copyright?: string;
  tagline?: string;
  partners?: Array<{
    name: string;
    logo?: string | null;
    website?: string | null;
  }>;
}

const Footer = ({
  organizationName = "Forest4Life",
  description = "The Forest4Life Project is dedicated to restoring degraded land in Rwanda through reforestation, agroforestry, and sustainable land management practices.",
  logo = "/images/partners/toyota/logo.jpg",
  tags = ["Reforestation", "Community Training", "Youth Education"],
  contact = {
    address: "Kigali, Rwanda",
    phone: "+250 XXX XXX XXX",
    email: "info@forest4life.org",
  },
  socialLinks = [],
  copyright = "© 2024 Forest4Life. All rights reserved.",
  tagline = "Built with 💚 for a sustainable future",
  partners = [],
}: FooterProps) => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return Facebook;
      case 'twitter':
        return Twitter;
      case 'linkedin':
        return Linkedin;
      case 'instagram':
        return Instagram;
      default:
        return null;
    }
  };

  const getSocialHoverClass = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]';
      case 'twitter':
        return 'hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]';
      case 'linkedin':
        return 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]';
      case 'instagram':
        return 'hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]';
      default:
        return '';
    }
  };

  const tagColors = [
    'bg-primary/10 text-primary',
    'bg-accent/10 text-accent',
    'bg-success/10 text-success',
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      {/* Profile & Contact Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Organization Profile */}
            <div className="md:col-span-2 space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Image
                  src={logo}
                  alt={`${organizationName} Logo`}
                  width={64}
                  height={64}
                  className="h-12 w-12 md:h-16 md:w-16 object-contain shrink-0"
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{organizationName}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                    {description}
                  </p>
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {tags.map((tag, index) => (
                        <div
                          key={index}
                          className={`px-3 py-1 rounded-full ${tagColors[index % tagColors.length]}`}
                        >
                          <span className="text-sm font-medium">{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            {contact && (contact.address || contact.phone || contact.email) && (
              <Card className="card-hover">
                <CardContent className="p-6 space-y-6">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Get In Touch
                  </h4>
                  
                  <div className="space-y-4">
                    {contact.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium">Head Office</p>
                          <p className="text-sm text-muted-foreground">{contact.address}</p>
                        </div>
                      </div>
                    )}
                    
                    {contact.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {contact.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href="/contact">
                    <Button variant="hero" className="w-full">
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Social Media & Partners */}
      <section className="border-t border-border py-12">
        <div className="container-width">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social Media */}
            {socialLinks && socialLinks.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Follow Our Journey
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => {
                    const IconComponent = getSocialIcon(link.platform);
                    if (!IconComponent || !link.url) return null;
                    return (
                      <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          size="icon"
                          className={getSocialHoverClass(link.platform)}
                        >
                          <IconComponent className="h-5 w-5" />
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Partners */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Our Partners</h4>
              {partners && partners.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {partners.map((partner, index) => (
                    <div key={index} className="flex items-center justify-center">
                      {partner.website ? (
                        <Link
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-full h-20 p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          {partner.logo ? (
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              width={120}
                              height={60}
                              className="max-w-full max-h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                          ) : (
                            <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                              {partner.name}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <div className="flex items-center justify-center w-full h-20 p-4 bg-background rounded-lg border border-border">
                          {partner.logo ? (
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              width={120}
                              height={60}
                              className="max-w-full max-h-full object-contain opacity-70"
                            />
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {partner.name}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-sm text-muted-foreground text-center italic">
                  Partner logos and information will be displayed here.
                  We work with local communities, international organizations,
                  and government agencies to maximize our impact.
                </p>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <div className="border-t border-border py-6">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-muted-foreground">{copyright}</p>
            </div>
            
            {tagline && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="h-4 w-4 text-primary" />
                <span>{tagline}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
