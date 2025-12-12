import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import BlogListClient from "./BlogListClient";
import { reader } from "../reader";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export default async function BlogPage() {
  const allBlogs = await reader.collections.blogs.all();

  // Transform blogs to match the client component interface
  const blogs = await Promise.all(
    allBlogs.map(async (blog) => {
      const author = blog.entry.author
        ? await reader.collections.authors.read(blog.entry.author)
        : null;

      return {
        slug: blog.slug,
        title: blog.entry.title,
        excerpt: blog.entry.excerpt || "",
        status: blog.entry.status || "draft",
        author: author
          ? {
              full_name: author.full_name,
              bio: author.bio || "",
              avatar: author.avatar || undefined,
            }
          : undefined,
        category: blog.entry.category || "",
        tags: blog.entry.tags || [],
        featured_image: blog.entry.featured_image || undefined,
        reading_time_minutes: blog.entry.reading_time_minutes || undefined,
        published_at: blog.entry.published_at || blog.entry.date_created || undefined,
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
                <BookOpen className="h-4 w-4 mr-2" />
                Latest Insights
              </Badge>
              <h1 className="hero-text mb-8">
                Stories from the Forest
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
                Discover insights, research findings, and inspiring stories from our forest restoration 
                and community empowerment work across Rwanda.
              </p>
            </div>
          </div>
        </section>

        {/* Blog List with Search/Filter */}
        <BlogListClient blogs={blogs} />

        {/* Newsletter CTA */}
        <section className="section-padding bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <div className="container-width text-center">
            <h2 className="mb-6 text-white">Stay Updated with Our Latest Insights</h2>
            <p className="text-xl mb-8 text-white/90 max-w-4xl mx-auto">
              Subscribe to our newsletter and never miss important updates about forest restoration, 
              community impact, and environmental conservation in Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}
