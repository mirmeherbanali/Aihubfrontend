import { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolDetailsClient from "./ToolDetailsClient";
import { unslugify } from "@/utils/useEncodeUrl";

type Props = {
  params: { toolname: string };
};

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const toolName = unslugify(params.toolname);

  const description = `Explore ${toolName} – features, pricing, use cases, and alternatives. Learn how this tool works and decide if it’s right for you.`;

  const url = `https://app.recuip.com/product/${params.toolname}`;

  return {
    title: toolName,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: toolName,
      description,
      url,
      siteName: "Recuip",
      images: [
        {
          url: "https://app.recuip.com/og-image.png",
          width: 1200,
          height: 630,
          alt: toolName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: toolName,
      description,
      images: ["https://app.recuip.com/og-image.png"],
    },
  };
}

export default function Page({ params }: Props) {
  if (!params.toolname) notFound();

  return <ToolDetailsClient toolname={params.toolname} />;
}
