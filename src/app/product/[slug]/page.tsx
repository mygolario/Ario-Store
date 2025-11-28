export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">محصول: {slug}</h1>
      <p>جزئیات محصول در اینجا نمایش داده می‌شود.</p>
    </div>
  );
}
