import ComingSoon, { comingSoonMetadata } from "@/components/ComingSoon";

const PATH = "/brands/ingredients";
const TITLE = "Brands by ingredient";

export const metadata = comingSoonMetadata(PATH, TITLE);

export default function Page() {
  return <ComingSoon path={PATH} title={TITLE} />;
}
