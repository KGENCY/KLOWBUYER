import ComingSoon, { comingSoonMetadata } from "@/components/ComingSoon";

type Params = Promise<{ slug?: string[] }>;

/** Every /guides path (import guides, trend reports, ingredient guides) until the Guides pages exist. */
const pathFor = (slug?: string[]) => ["/guides", ...(slug ?? [])].join("/");

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  return comingSoonMetadata(pathFor(slug), slug ? undefined : "Guides");
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <ComingSoon path={pathFor(slug)} title={slug ? undefined : "Guides"} />;
}
