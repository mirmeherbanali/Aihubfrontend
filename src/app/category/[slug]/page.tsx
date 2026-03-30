import { Metadata } from "next";
import { notFound } from "next/navigation";
import CategorySlugClient from "./CategorySlugClient";
import { unslugify } from "@/utils/useEncodeUrl";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = unslugify(params.slug);

  const description = `Browse the best ${categoryName} tools in one place. Explore features, pricing, and popular use cases to choose the right ${categoryName}.`;

  return {
    title: categoryName,
    description,
    alternates: {
      canonical: `https://app.recuip.com/categories/${params.slug}`,
    },
    openGraph: {
      title: categoryName,
      description,
      url: `https://app.recuip.com/categories/${params.slug}`,
      siteName: "Alllisted",
      images: [
        {
          url: "https://app.recuip.com/og-image.png",
          width: 1200,
          height: 630,
          alt: categoryName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: categoryName,
      description,
      images: ["https://app.recuip.com/og-image.png"],
    },
  };
}

export default function Page({ params }: Props) {
  // Pass slug to client component
  if (!params.slug) notFound();

  return <CategorySlugClient slug={params.slug} />;
}
