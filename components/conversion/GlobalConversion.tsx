"use client";

import { usePathname } from "next/navigation";
import WhatsAppButton from "./WhatsAppButton";
import ExitIntentModal from "./ExitIntentModal";

/** Site-wide WhatsApp button and exit-intent offer — everywhere except internal /dev pages. */
export default function GlobalConversion() {
  const path = usePathname();
  if (path.startsWith("/dev")) return null;
  return (
    <>
      <ExitIntentModal />
      <WhatsAppButton />
    </>
  );
}
