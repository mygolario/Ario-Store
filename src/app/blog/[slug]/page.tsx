"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts } from "@/data/posts";
import { formatPersianDate } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return <div className="container mx-auto px-4 py-8">در حال بارگذاری...</div>;
  }

  const post = getPostBySlug(slug);

  if (!post) {
    router.push("/blog");
    return null;
  }

  const relatedPosts = getRelatedPosts(post, 3);

  // Simple markdown-like content renderer
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let currentParagraph: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let currentListItems: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`} className="mb-4">
            {currentParagraph.join(" ")}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentListItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside mb-4 space-y-2 mr-4">
            {currentListItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        currentListItems = [];
      }
    };

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim().startsWith("```")) {
        flushList();
        flushParagraph();
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre
              key={`code-${index}`}
              className="bg-muted p-4 rounded-lg overflow-x-auto my-4"
            >
              <code>{codeBlockContent.join("\n")}</code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle headers
      if (line.startsWith("# ")) {
        flushList();
        flushParagraph();
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-8 mb-4">
            {line.substring(2)}
          </h2>
        );
        return;
      }

      if (line.startsWith("## ")) {
        flushList();
        flushParagraph();
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold mt-6 mb-3">
            {line.substring(3)}
          </h3>
        );
        return;
      }

      if (line.startsWith("### ")) {
        flushList();
        flushParagraph();
        elements.push(
          <h4 key={`h4-${index}`} className="text-lg font-semibold mt-4 mb-2">
            {line.substring(4)}
          </h4>
        );
        return;
      }

      // Handle list items
      if (line.trim().startsWith("- ")) {
        flushParagraph();
        currentListItems.push(line.trim().substring(2));
        return;
      }

      // Regular paragraph
      if (line.trim() === "") {
        flushList();
        flushParagraph();
      } else {
        if (currentListItems.length > 0) {
          flushList();
        }
        currentParagraph.push(line.trim());
      }
    });

    flushList();
    flushParagraph();

    return elements;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog" className="mb-6 inline-block">
          <Button variant="ghost">← بازگشت به بلاگ</Button>
        </Link>

        {/* Post Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-muted-foreground">
            <span>{formatPersianDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Post Content */}
        <article className="prose prose-sm max-w-none mb-12">
          <div className="text-foreground leading-relaxed">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {relatedPost.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {relatedPost.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" className="w-full">
                        ادامه مطلب
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
