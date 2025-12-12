import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";
import Image from "next/image";

interface WhoWeAreProps {
  title: string;
  paragraphs: string[] | readonly string[];
  keyValues: Array<{
    icon: string;
    title: string;
    description: string;
  }> | readonly {
    icon: string;
    title: string;
    description: string;
  }[];
  mission: {
    title: string;
    description: string;
    foundedYear: string;
  };
}

const WhoWeAre = ({ title, paragraphs, keyValues, mission }: WhoWeAreProps) => {
  const MissionIcon = Icons.Leaf;

  return (
    <section className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="mb-6">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="prose prose-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Values */}
            {keyValues && keyValues.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {keyValues.map((value, index) => {
                  // Check if icon is a URL/image path or a Lucide icon name
                  const isImageUrl = value.icon && (
                    value.icon.startsWith('/') || 
                    value.icon.startsWith('http://') || 
                    value.icon.startsWith('https://')
                  );
                  
                  // Get Lucide icon component if it's an icon name
                  const IconComponent = !isImageUrl && value.icon 
                    ? (Icons[value.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>)
                    : null;

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg relative w-10 h-10 flex-shrink-0">
                        {isImageUrl && value.icon ? (
                          <Image
                            src={value.icon}
                            alt={value.title}
                            fill
                            className="object-contain p-1"
                          />
                        ) : IconComponent ? (
                          <IconComponent className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        ) : (
                          <Icons.Leaf className="h-6 w-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Visual Element */}
          <div className="relative">
            <Card className="card-hover">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <MissionIcon className="h-12 w-12 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-muted-foreground">{mission.description}</p>
                  </div>

                  <div className="border-t pt-6">
                    <div className="text-4xl font-bold text-primary mb-1">{mission.foundedYear}</div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
