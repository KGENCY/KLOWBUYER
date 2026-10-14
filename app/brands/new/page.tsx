import ComingSoon, { comingSoonMetadata } from "@/components/ComingSoon";

const PATH = "/brands/new";

export const metadata = comingSoonMetadata(PATH);

export default function Page() {
  return <ComingSoon path={PATH} />;
}
