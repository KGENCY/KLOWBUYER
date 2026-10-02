import RequestDetail from "@/components/RequestDetail";

export const metadata = { title: "Sample request — KLOW Wholesale" };

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RequestDetail id={id} />;
}
