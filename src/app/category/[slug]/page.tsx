export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">دسته‌بندی: {slug}</h1>
      <p>محصولات این دسته‌بندی در اینجا نمایش داده می‌شوند.</p>
    </div>
  );
}
