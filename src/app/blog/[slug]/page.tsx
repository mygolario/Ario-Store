export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">مقاله: {slug}</h1>
      <p>متن مقاله در اینجا قرار می‌گیرد.</p>
    </div>
  );
}
