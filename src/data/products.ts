import { Product } from "@/types";

export const products: Product[] = [
  // Headphones
  {
    id: "1",
    slug: "sony-wh-1000xm5",
    name: "هدفون بی‌سیم سونی WH-1000XM5",
    shortDescription: "هدفون نویز کنسلینگ حرفه‌ای با باتری 30 ساعته",
    fullDescription:
      "هدفون بی‌سیم سونی WH-1000XM5 با تکنولوژی نویز کنسلینگ پیشرفته، تجربه گوش دادن به موسیقی را متحول می‌کند. این هدفون با باتری 30 ساعته و شارژ سریع، برای استفاده طولانی مدت ایده‌آل است.",
    price: 15990000,
    oldPrice: 18990000,
    categoryId: "1",
    brand: "Sony",
    inStock: true,
    tags: ["نویز کنسلینگ", "بلوتوث", "حرفه‌ای"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.2",
      "نویز کنسلینگ": "فعال",
      "زمان باتری": "30 ساعت",
      "وزن": "250 گرم",
      "مقاومت در برابر آب": "IPX4",
    },
    rating: 4.8,
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "2",
    slug: "apple-airpods-pro-2",
    name: "ایرپادز پرو 2 اپل",
    shortDescription: "گوشی‌های بی‌سیم با نویز کنسلینگ و کیفیت صدای استثنایی",
    fullDescription:
      "ایرپادز پرو 2 اپل با تراشه H2 جدید، نویز کنسلینگ دو برابر بهتر و کیفیت صدای استثنایی ارائه می‌دهد. طراحی ارگونومیک و مقاوم در برابر عرق و آب.",
    price: 12990000,
    categoryId: "1",
    brand: "Apple",
    inStock: true,
    tags: ["نویز کنسلینگ", "بلوتوث", "اپل"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.3",
      "نویز کنسلینگ": "فعال",
      "زمان باتری": "6 ساعت (با کیس 30 ساعت)",
      "مقاومت در برابر آب": "IPX4",
    },
    rating: 4.7,
    isBestSeller: true,
    isFeatured: false,
  },
  {
    id: "3",
    slug: "bose-quietcomfort-45",
    name: "هدفون بوز QuietComfort 45",
    shortDescription: "هدفون راحت با نویز کنسلینگ عالی",
    fullDescription:
      "هدفون بوز QuietComfort 45 با نویز کنسلینگ پیشرفته و راحتی بی‌نظیر، برای سفر و استفاده روزمره طراحی شده است.",
    price: 13990000,
    oldPrice: 16990000,
    categoryId: "1",
    brand: "Bose",
    inStock: true,
    tags: ["نویز کنسلینگ", "راحت", "سفر"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.1",
      "نویز کنسلینگ": "فعال",
      "زمان باتری": "24 ساعت",
      "وزن": "238 گرم",
    },
    rating: 4.6,
    isBestSeller: false,
    isFeatured: true,
  },
  {
    id: "4",
    slug: "sennheiser-momentum-4",
    name: "هدفون سنهایزر Momentum 4",
    shortDescription: "هدفون پریمیوم با صدای Hi-Fi",
    fullDescription:
      "هدفون سنهایزر Momentum 4 با درایورهای 42 میلی‌متری و تکنولوژی Adaptive Noise Cancellation، کیفیت صدای Hi-Fi را ارائه می‌دهد.",
    price: 17990000,
    categoryId: "1",
    brand: "Sennheiser",
    inStock: true,
    tags: ["Hi-Fi", "پریمیوم", "بلوتوث"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.2",
      "نویز کنسلینگ": "Adaptive",
      "زمان باتری": "60 ساعت",
      "وزن": "293 گرم",
    },
    rating: 4.9,
    isBestSeller: false,
    isFeatured: true,
  },
  // Speakers
  {
    id: "5",
    slug: "sonos-move-2",
    name: "اسپیکر بی‌سیم سونوس Move 2",
    shortDescription: "اسپیکر قابل حمل با صدای قدرتمند و باتری 24 ساعته",
    fullDescription:
      "اسپیکر بی‌سیم سونوس Move 2 با طراحی قابل حمل و مقاوم در برابر آب، صدای استریو قدرتمند و باتری 24 ساعته ارائه می‌دهد.",
    price: 8990000,
    categoryId: "2",
    brand: "Sonos",
    inStock: true,
    tags: ["قابل حمل", "مقاوم در برابر آب", "قدرتمند"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.0، Wi-Fi",
      "قدرت": "2x 30W",
      "زمان باتری": "24 ساعت",
      "مقاومت در برابر آب": "IP56",
    },
    rating: 4.7,
    isBestSeller: true,
    isFeatured: false,
  },
  {
    id: "6",
    slug: "jbl-flip-6",
    name: "اسپیکر جی‌بی‌ال Flip 6",
    shortDescription: "اسپیکر قابل حمل با صدای استریو و مقاوم در برابر آب",
    fullDescription:
      "اسپیکر جی‌بی‌ال Flip 6 با طراحی جمع‌وجور و مقاوم در برابر آب، صدای استریو قدرتمند برای موسیقی و مهمانی‌ها ارائه می‌دهد.",
    price: 3990000,
    oldPrice: 4990000,
    categoryId: "2",
    brand: "JBL",
    inStock: true,
    tags: ["قابل حمل", "مقاوم در برابر آب", "استریو"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.1",
      "قدرت": "2x 20W",
      "زمان باتری": "12 ساعت",
      "مقاومت در برابر آب": "IPX7",
    },
    rating: 4.5,
    isBestSeller: true,
    isFeatured: false,
  },
  {
    id: "7",
    slug: "bose-soundlink-flex",
    name: "اسپیکر بوز SoundLink Flex",
    shortDescription: "اسپیکر قابل حمل با باس قدرتمند",
    fullDescription:
      "اسپیکر بوز SoundLink Flex با طراحی مقاوم و باس قدرتمند، برای استفاده در فضای باز و سفر ایده‌آل است.",
    price: 5990000,
    categoryId: "2",
    brand: "Bose",
    inStock: true,
    tags: ["قابل حمل", "باس قدرتمند", "مقاوم"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 4.2",
      "قدرت": "1x 20W",
      "زمان باتری": "12 ساعت",
      "مقاومت در برابر آب": "IP67",
    },
    rating: 4.6,
    isBestSeller: false,
    isFeatured: true,
  },
  {
    id: "8",
    slug: "sony-srs-xb43",
    name: "اسپیکر سونی SRS-XB43",
    shortDescription: "اسپیکر پارتی با نور LED و باس اکسترا",
    fullDescription:
      "اسپیکر سونی SRS-XB43 با نور LED رنگی و باس اکسترا، برای مهمانی‌ها و رویدادهای فضای باز طراحی شده است.",
    price: 7990000,
    categoryId: "2",
    brand: "Sony",
    inStock: false,
    tags: ["پارتی", "نور LED", "باس اکسترا"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث 5.0",
      "قدرت": "2x 30W",
      "زمان باتری": "24 ساعت",
      "مقاومت در برابر آب": "IP67",
    },
    rating: 4.4,
    isBestSeller: false,
    isFeatured: false,
  },
  // Smartwatches
  {
    id: "9",
    slug: "apple-watch-series-9",
    name: "ساعت هوشمند اپل واچ سری 9",
    shortDescription: "ساعت هوشمند با پردازنده S9 و نمایشگر همیشه روشن",
    fullDescription:
      "ساعت هوشمند اپل واچ سری 9 با پردازنده S9 جدید، نمایشگر همیشه روشن روشن‌تر و قابلیت‌های سلامت پیشرفته، همراه کامل شماست.",
    price: 19990000,
    oldPrice: 22990000,
    categoryId: "3",
    brand: "Apple",
    inStock: true,
    tags: ["سلامت", "ورزش", "اپل"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "اندازه صفحه": "45mm",
      "باتری": "18 ساعت",
      "مقاومت در برابر آب": "WR50",
      "سیستم عامل": "watchOS 10",
    },
    rating: 4.8,
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "10",
    slug: "samsung-galaxy-watch-6",
    name: "ساعت هوشمند سامسونگ گلکسی واچ 6",
    shortDescription: "ساعت هوشمند اندروید با نمایشگر AMOLED و سلامت پیشرفته",
    fullDescription:
      "ساعت هوشمند سامسونگ گلکسی واچ 6 با نمایشگر AMOLED زیبا، ردیابی سلامت پیشرفته و باتری 40 ساعته، برای کاربران اندروید ایده‌آل است.",
    price: 14990000,
    categoryId: "3",
    brand: "Samsung",
    inStock: true,
    tags: ["اندروید", "سلامت", "AMOLED"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "اندازه صفحه": "44mm",
      "باتری": "40 ساعت",
      "مقاومت در برابر آب": "5ATM",
      "سیستم عامل": "Wear OS",
    },
    rating: 4.6,
    isBestSeller: true,
    isFeatured: false,
  },
  {
    id: "11",
    slug: "garmin-forerunner-265",
    name: "ساعت هوشمند گارمین Forerunner 265",
    shortDescription: "ساعت ورزشی حرفه‌ای با GPS و ردیابی پیشرفته",
    fullDescription:
      "ساعت هوشمند گارمین Forerunner 265 با GPS دقیق، ردیابی ورزشی پیشرفته و نمایشگر AMOLED، برای دونده‌ها و ورزشکاران حرفه‌ای طراحی شده است.",
    price: 17990000,
    categoryId: "3",
    brand: "Garmin",
    inStock: true,
    tags: ["ورزش", "GPS", "حرفه‌ای"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "اندازه صفحه": "46mm",
      "باتری": "13 روز",
      "مقاومت در برابر آب": "5ATM",
      "GPS": "دقیق",
    },
    rating: 4.7,
    isBestSeller: false,
    isFeatured: true,
  },
  {
    id: "12",
    slug: "fitbit-versa-4",
    name: "ساعت هوشمند فیت‌بیت Versa 4",
    shortDescription: "ساعت هوشمند با ردیابی سلامت و ورزش",
    fullDescription:
      "ساعت هوشمند فیت‌بیت Versa 4 با ردیابی سلامت 24/7، ردیابی ورزشی و باتری 6 روزه، برای سبک زندگی سالم ایده‌آل است.",
    price: 8990000,
    categoryId: "3",
    brand: "Fitbit",
    inStock: true,
    tags: ["سلامت", "ورزش", "باتری طولانی"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "اندازه صفحه": "40mm",
      "باتری": "6 روز",
      "مقاومت در برابر آب": "5ATM",
      "ردیابی سلامت": "24/7",
    },
    rating: 4.3,
    isBestSeller: false,
    isFeatured: false,
  },
  // Accessories
  {
    id: "13",
    slug: "anker-powerbank-20000",
    name: "پاوربانک آنکر 20000 میلی‌آمپر",
    shortDescription: "پاوربانک قدرتمند با شارژ سریع و ظرفیت بالا",
    fullDescription:
      "پاوربانک آنکر با ظرفیت 20000 میلی‌آمپر و پورت USB-C با شارژ سریع، برای شارژ چندین دستگاه ایده‌آل است.",
    price: 2990000,
    oldPrice: 3990000,
    categoryId: "4",
    brand: "Anker",
    inStock: true,
    tags: ["شارژ سریع", "ظرفیت بالا", "USB-C"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "ظرفیت": "20000 mAh",
      "پورت": "USB-C, USB-A",
      "شارژ سریع": "Power Delivery",
      "وزن": "350 گرم",
    },
    rating: 4.6,
    isBestSeller: true,
    isFeatured: false,
  },
  {
    id: "14",
    slug: "belkin-usb-c-hub",
    name: "هاب USB-C بیلکین",
    shortDescription: "هاب چند پورته با HDMI و USB",
    fullDescription:
      "هاب USB-C بیلکین با پورت‌های متعدد شامل HDMI، USB 3.0 و کارت خوان، برای لپ‌تاپ‌ها و تبلت‌ها ایده‌آل است.",
    price: 2490000,
    categoryId: "4",
    brand: "Belkin",
    inStock: true,
    tags: ["هاب", "USB-C", "HDMI"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "پورت HDMI": "4K@60Hz",
      "پورت USB": "USB 3.0 x2",
      "کارت خوان": "SD, microSD",
      "قدرت": "100W",
    },
    rating: 4.5,
    isBestSeller: false,
    isFeatured: true,
  },
  {
    id: "15",
    slug: "logitech-mx-master-3s",
    name: "ماوس بی‌سیم لوژیتک MX Master 3S",
    shortDescription: "ماوس حرفه‌ای با دقت بالا و باتری 70 روزه",
    fullDescription:
      "ماوس بی‌سیم لوژیتک MX Master 3S با دقت 8000 DPI، اسکرول مغناطیسی و باتری 70 روزه، برای کارهای حرفه‌ای و طراحی ایده‌آل است.",
    price: 4990000,
    categoryId: "4",
    brand: "Logitech",
    inStock: true,
    tags: ["حرفه‌ای", "دقت بالا", "باتری طولانی"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
      "https://picsum.photos/400/400",
    ],
    specs: {
      "DPI": "8000",
      "باتری": "70 روز",
      "نوع اتصال": "بلوتوث، USB",
      "دکمه‌ها": "7 دکمه",
    },
    rating: 4.8,
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: "16",
    slug: "apple-magic-keyboard",
    name: "کیبورد بی‌سیم اپل Magic Keyboard",
    shortDescription: "کیبورد نازک و سبک با باتری قابل شارژ",
    fullDescription:
      "کیبورد بی‌سیم اپل Magic Keyboard با طراحی نازک و سبک، کلیدهای راحت و باتری قابل شارژ، برای مک و آیپد ایده‌آل است.",
    price: 5990000,
    categoryId: "4",
    brand: "Apple",
    inStock: false,
    tags: ["نازک", "سبک", "اپل"],
    mainImage: "https://picsum.photos/400/400",
    gallery: [
      "https://picsum.photos/400/400",
    ],
    specs: {
      "نوع اتصال": "بلوتوث",
      "باتری": "1 ماه",
      "نوع کلید": "Scissor mechanism",
      "وزن": "231 گرم",
    },
    rating: 4.4,
    isBestSeller: false,
    isFeatured: false,
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategoryId(
  categoryId: string
): Product[] {
  return products.filter((product) => {
    if (Array.isArray(product.categoryId)) {
      return product.categoryId.includes(categoryId);
    }
    return product.categoryId === categoryId;
  });
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      product.shortDescription.toLowerCase().includes(lowerQuery)
  );
}

