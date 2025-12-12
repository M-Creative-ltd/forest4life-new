import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { reader } from "../reader";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Send,
  MessageCircle,
  Clock,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Contact Us | Forest4Life",
  description: "Get in touch with Forest4Life. We'd love to hear from you about partnerships, volunteering, or any questions you might have.",
};

export default async function ContactPage() {
  const settings = await reader.singletons.settings.read();
  
  const contact = settings?.footer?.contact;
  const socialLinks = settings?.footer?.socialLinks || [];

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent pointer-events-none" />
          <div className="container-width relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 transition-colors">
                <MessageCircle className="h-4 w-4 mr-2" />
                Get in Touch
              </Badge>
              <h1 className="hero-text mb-6">
                Let's Start a Conversation
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Whether you're interested in partnership opportunities, have questions about our projects, or want to volunteer, we're here to help.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background relative z-10 -mt-8">
          <div className="container-width">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out to us directly through any of these channels. Our team is available Monday through Friday, 8:00 AM to 5:00 PM CAT.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contact?.address && (
                    <Card className="card-hover border-l-4 border-l-primary">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Our Office</h3>
                          <p className="text-muted-foreground">{contact.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {contact?.email && (
                    <Card className="card-hover border-l-4 border-l-accent">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="bg-accent/10 p-3 rounded-full text-accent shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                          <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                            {contact.email}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {contact?.phone && (
                    <Card className="card-hover border-l-4 border-l-primary">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                          <a href={`tel:${contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                            {contact.phone}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {contact?.whatsapp && (
                    <Card className="card-hover border-l-4 border-l-green-500">
                      <CardContent className="flex items-start gap-4 p-6">
                        <div className="bg-green-50 p-3 rounded-full text-green-600 shrink-0">
                          <MessageCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                          <a href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-green-600 transition-colors">
                            Chat with us on WhatsApp
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {socialLinks.length > 0 && (
                  <div className="pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map((link) => {
                        const Icon = getSocialIcon(link.platform);
                        return (
                          <a 
                            key={link.platform}
                            href={link.url || '#'}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-muted hover:bg-primary/10 hover:text-primary p-3 rounded-full transition-all duration-300"
                            aria-label={`Follow us on ${link.platform}`}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-2xl shadow-lg border p-6 md:p-8 lg:p-10 sticky top-24">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" required className="bg-background" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" required className="bg-background" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" required className="bg-background" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your inquiry..." 
                      className="min-h-[150px] bg-background resize-y" 
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full text-lg h-12">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* Map Section (Visual only for now) */}
        <section className="h-[400px] w-full bg-muted relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 opacity-50" />
          <div className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-xl shadow-sm border max-w-sm mx-4 relative z-10">
            <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Visit Our Headquarters</h3>
            <p className="text-muted-foreground mb-4">
              {contact?.address || "Kigali, Rwanda"}
            </p>
            <Button variant="outline" asChild size="sm">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact?.address || "Kigali, Rwanda")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </Button>
          </div>
          {/* Decorative map background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook': return Facebook;
    case 'twitter': return Twitter;
    case 'linkedin': return Linkedin;
    case 'instagram': return Instagram;
    case 'telegram': return MessageCircle; // Approximate
    default: return Globe;
  }
}
