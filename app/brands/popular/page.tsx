import { permanentRedirect } from "next/navigation";

/** Old menu URL — brands are now filtered on /brands. */
export default function Page() {
  permanentRedirect("/brands?filter=popular");
}
