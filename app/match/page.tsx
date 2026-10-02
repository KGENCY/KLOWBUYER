import Concierge from "@/components/Concierge";

export const metadata = { title: "Find my brands — KLOW Wholesale" };

export default async function MatchPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  return <Concierge initialType={type} />;
}
