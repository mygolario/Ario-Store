"use client";

import Link from "next/link";
import { getAllPosts } from "@/data/posts";
import { formatPersianDate, getRelativeTime } from "@/lib/date";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">بلاگ</h1>
        <p className="text-muted-foreground">
          آخرین مقالات و راهنمای‌های خرید محصولات دیجیتال
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span>{formatPersianDate(post.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{getRelativeTime(post.createdAt)}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full">
                    ادامه مطلب
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
