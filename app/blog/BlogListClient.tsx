"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Tag,
} from "lucide-react";

interface BlogAuthor {
  full_name: string;
  bio: string;
  avatar?: string;
}

interface Blog {
  slug: string;
  title: string;
  excerpt?: string;
  status: string;
  author?: BlogAuthor;
  category?: string;
  tags?: string[] | readonly string[];
  featured_image?: string;
  reading_time_minutes?: number;
  published_at?: string;
}

interface BlogListClientProps {
  blogs: Blog[];
}

export default function BlogListClient({ blogs: initialBlogs }: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique categories for filter
  const categories = [...new Set(initialBlogs.map(b => b.category).filter((cat): cat is string => Boolean(cat)))];

  // Filter and sort blogs
  const filteredBlogs = initialBlogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (blog.excerpt && blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter;
      const isPublished = blog.status === "published";
      
      return matchesSearch && matchesCategory && isPublished;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime();
        case "oldest":
          return new Date(a.published_at || 0).getTime() - new Date(b.published_at || 0).getTime();
        case "reading-time":
          return (a.reading_time_minutes || 0) - (b.reading_time_minutes || 0);
        default:
          return 0;
      }
    });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <>
      {/* Search and Filter Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-width">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search blogs by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="reading-time">Reading Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredBlogs.length} of {initialBlogs.length} blogs
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-background">
        <div className="container-width">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredBlogs.map((blog) => (
                <Card key={blog.slug} className="card-hover group">
                  {blog.featured_image && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {blog.category && (
                        <Badge variant="secondary">{blog.category}</Badge>
                      )}
                      {blog.published_at && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(blog.published_at)}
                        </div>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {blog.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {blog.author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{blog.author.full_name}</span>
                        </div>
                      )}
                      {blog.reading_time_minutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{blog.reading_time_minutes} min read</span>
                        </div>
                      )}
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Link href={`/blog/${blog.slug}`}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
