import { permanentRedirect } from "next/navigation";

/** Old menu URL — brands are now filtered on /brands. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/brands?category=${encodeURIComponent(slug)}`);
}
