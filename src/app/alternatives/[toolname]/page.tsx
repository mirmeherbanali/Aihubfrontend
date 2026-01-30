import { Metadata } from "next";
import { notFound } from "next/navigation";
import AlternativesClient from "./AlternativesClient";
import { unslugify } from "@/utils/useEncodeUrl";

type Props = {
  params: { toolname: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const toolName = unslugify(params.toolname);

  const title = `Best ${toolName} Alternatives`;
  const description = `Discover the best alternatives to ${toolName}. Compare tools by features, pricing, and use cases to find the right replacement.`;

  const url = `https://app.recuip.com/alternatives/${params.toolname}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Recuip",
      images: [
        {
          url: "https://app.recuip.com/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://app.recuip.com/og-image.png"],
    },
  };
}

export default function Page({ params }: Props) {
  if (!params.toolname) notFound();

  return <AlternativesClient toolname={params.toolname} />;
}
