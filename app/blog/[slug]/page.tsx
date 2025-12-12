import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Markdoc from '@markdoc/markdoc';
import React from 'react';

import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User,
  Tag,  Mail,
  X,
  Facebook,
  Linkedin
} from "lucide-react";
import HeaderWrapper from "@/components/HeaderWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import { reader } from "../../reader";

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const blog = await reader.collections.blogs.read(slug);

  if (!blog || blog.status !== "published") {
    notFound();
  }

  const author = blog.author
    ? await reader.collections.authors.read(blog.author)
    : null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  // Helper to render markdoc content
  const renderMarkdocContent = (content: any) => {
    if (!content) return null;
    
    try {
      if (typeof content === 'string') {
        const ast = Markdoc.parse(content);
        const renderable = Markdoc.transform(ast);
        return Markdoc.renderers.react(renderable, React);
      }
      
      if (typeof content === 'object') {
        // Assume it is already an AST
        const renderable = Markdoc.transform(content);
        return Markdoc.renderers.react(renderable, React);
      }
    } catch (e) {
      console.error("Error rendering markdoc:", e);
    }

    return <p className="text-muted-foreground">Content is being prepared.</p>;
  };

  const shareUrl = `/blog/${slug}`;

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 section-padding">
          <div className="container-width">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>

            <div>
              {blog.category && (
                <Badge className="mb-4">{blog.category}</Badge>
              )}
              
              <h1 className="hero-text mb-6 max-w-4xl mx-auto">{blog.title}</h1>
              
              {blog.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto">
                  {blog.excerpt}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground max-w-4xl mx-auto">
                {author && (
                  <div className="flex items-center gap-2">
                    {author.avatar ? (
                      <Image
                        src={author.avatar}
                        alt={author.full_name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <span className="font-medium">{author.full_name}</span>
                  </div>
                )}
                
                {blog.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blog.published_at)}
                  </div>
                )}
                
                {blog.reading_time_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {blog.reading_time_minutes} min read
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {blog.featured_image && (
          <section className="section-padding bg-background">
            <div className="container-width">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="container-width">
            <article className="prose prose-lg max-w-none">
              {renderMarkdocContent(blog.content)}
            </article>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Share this article:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <X className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(blog.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(shareUrl)}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author Card */}
              {author && (
                <Card className="mt-12">
                  <CardHeader>
                    <CardTitle>About the Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {author.avatar ? (
                        <Image
                          src={author.avatar}
                          alt={author.full_name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <User className="h-10 w-10 text-primary" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{author.full_name}</h4>
                        {author.bio && (
                          <p className="text-muted-foreground">{author.bio}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        </section>
      </main>

      <FooterWrapper />
    </div>
  );
}
