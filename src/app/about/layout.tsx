export const metadata = {
  title: "About Recuip – AI Tools Directory Built for Smarter Discovery",
  description:
    "Learn about Recuip, an AI tools discovery platform designed to help users explore, compare, and choose the best AI tools across industries and use cases.",
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Recuip" }],
  alternates: {
    canonical: "https://app.recuip.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://app.recuip.com/about",
    title: "About Recuip – AI Tools Directory for Smarter Discovery",
    description:
      "Discover the mission behind Recuip and how we help users find, compare, and evaluate the best AI tools for productivity, creativity, and growth.",
    images: [
      {
        url: "https://app.recuip.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recuip AI Tools Directory",
      },
    ],
    siteName: "Recuip",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Recuip – AI Tools Directory",
    description:
      "Learn why Recuip exists and how we simplify AI tool discovery through curated listings, comparisons, and insights.",
    images: ["https://app.recuip.com/og-image.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
