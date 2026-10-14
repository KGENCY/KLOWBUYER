import ComingSoon, { comingSoonMetadata, comingSoonTitle } from "@/components/ComingSoon";

type Params = Promise<{ id: string }>;

/**
 * Search landing for a well-known brand (e.g. "anua wholesale"). Framed as alternatives:
 * KLOW doesn't claim to sell that brand, it points to similar partner brands.
 */
const titleFor = (id: string) => `${comingSoonTitle(`/brands/${id}/wholesale`)} alternatives at wholesale`;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  return comingSoonMetadata(`/brands/${id}/wholesale`, titleFor(id));
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const name = comingSoonTitle(`/brands/${id}/wholesale`);
  return (
    <ComingSoon
      path={`/brands/${id}/wholesale`}
      title={titleFor(id)}
      description={`Looking for ${name} wholesale? We’re putting together similar Korean brands you can sample from 1 unit at wholesale price. Tell us what you sell and we’ll suggest a match now.`}
    />
  );
}
