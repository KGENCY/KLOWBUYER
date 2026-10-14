import { permanentRedirect } from "next/navigation";

/** Section index — lives on the Guides hub. */
export default function Page() {
  permanentRedirect("/guides#ingredients");
}
