"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Search, Filter, ArrowRight, TreePine, Target } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  summary: string;
  status: string;
  district: string;
  start_date: string;
  end_date?: string;
  impact_metrics?: {
    trees_planted?: number;
    hectares_restored?: number;
    farmers_trained?: number;
  };
}

interface ProjectListClientProps {
  projects: Project[];
}

export default function ProjectListClient({ projects: initialProjects }: ProjectListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");

  const districts = [...new Set(initialProjects.map(p => p.district).filter(Boolean))];

  const filteredProjects = initialProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesDistrict = districtFilter === "all" || project.district === districtFilter;
    
    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const featuredProjects = initialProjects.filter(p => p.status === "published" || p.status === "ongoing").slice(0, 2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "completed": return "secondary";
      case "ongoing": return "default";
      case "draft": return "outline";
      default: return "outline";
    }
  };

  const formatNumber = (num?: number) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <>
      {featuredProjects.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-width">
            <div className="mb-12">
              <Badge className="mb-4">
                <Target className="h-4 w-4 mr-2" />
                Featured Projects
              </Badge>
              <h2 className="mb-6">Flagship Initiatives</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Our most impactful projects demonstrating innovative approaches to forest restoration and community development.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <Card key={project.slug} className="card-hover overflow-hidden">
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <TreePine className="h-16 w-16 text-primary/60" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant={getStatusColor(project.status) as any}>
                        {project.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(project.start_date)}
                      </div>
                    </div>
                    <CardTitle className="mb-4">{project.title}</CardTitle>
                    {project.district && (
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="text-sm">{project.district}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.summary}
                    </p>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/project/${project.slug}`}>
                        View Details
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
            <h2 className="mb-6">All Projects</h2>
            
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                
                {districts.length > 0 && (
                  <Select value={districtFilter} onValueChange={setDistrictFilter}>
                    <SelectTrigger className="w-[180px]">
                      <MapPin className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.slug} className="card-hover group">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant={getStatusColor(project.status) as any} className="shrink-0">
                      {project.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(project.start_date)}
                    </div>
                  </div>
                  
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </CardTitle>
                  
                  {project.district && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="text-sm">{project.district}</span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Link href={`/project/${project.slug}`}>
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <TreePine className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
