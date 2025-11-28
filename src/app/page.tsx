import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          به فروشگاه آریو خوش آمدید
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          تجربه خریدی متفاوت با بهترین کیفیت و قیمت.
          همین حالا محصولات ما را مشاهده کنید.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/products">
          <Button size="lg">مشاهده محصولات</Button>
        </Link>
        <Link href="/about">
          <Button variant="outline" size="lg">درباره ما</Button>
        </Link>
      </div>
    </div>
  );
}
