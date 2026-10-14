import ComingSoon, { comingSoonMetadata } from "@/components/ComingSoon";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return comingSoonMetadata(`/brands/category/${slug}`);
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <ComingSoon path={`/brands/category/${slug}`} />;
}
