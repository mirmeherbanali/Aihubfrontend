import { getAllBlogs } from "@/features/serverApi/serverApi";

type Props = {
  params: { slug: string };
};

const normalize = (str?: string) =>
  str?.trim().toLowerCase().replace(/\s+/g, "-") || "";

export default async function Head({ params }: Props) {
  const data = await getAllBlogs();

  const blog = data?.find(
    (b: any) =>
      b.status === "Published" &&
      normalize(b.slug) === normalize(params.slug)
  );

  if (!blog?.jsonLdSchema) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: blog.jsonLdSchema
            .replace('<script type="application/ld+json">', "")
            .replace("</script>", ""),
        }}
      />
    </>
  );
}