import ComingSoon, { comingSoonMetadata } from "@/components/ComingSoon";

const PATH = "/brands";
const TITLE = "All brands A–Z";

export const metadata = comingSoonMetadata(PATH, TITLE);

export default function Page() {
  return <ComingSoon path={PATH} title={TITLE} />;
}
