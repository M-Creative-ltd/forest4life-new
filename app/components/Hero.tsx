"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  highlightedPhrase: string;
  subtitle: string;
  backgroundImage: string;
  stats: Array<{
    value: string;
    label: string;
  }> | readonly {
    value: string;
    label: string;
  }[];
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

const Hero = ({
  title,
  highlightedPhrase,
  subtitle,
  backgroundImage,
  stats,
  primaryCTA,
  secondaryCTA,
}: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-width text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="hero-text text-white mb-6 px-4 md:px-0">
            {title}
            <br className="hidden md:block" />
            <span className="text-primary-light block md:inline"> {highlightedPhrase}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto px-4 md:px-0">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0">
            <Link href={primaryCTA?.href || "/services"}>
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                {primaryCTA?.text || "Explore Our Programs"}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={secondaryCTA?.href || "/contact"}>
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                {secondaryCTA?.text || "Get Involved"}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary-light mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;