"use client";

import { useBuyer } from "@/components/Buyer";
import LockedPrice from "./LockedPrice";

/** LockedPrice wired to the demo sign-in in the header, so both states can be flipped and compared. */
export default function LockedPriceLive(props: Omit<React.ComponentProps<typeof LockedPrice>, "isLoggedIn">) {
  const { buyer } = useBuyer();
  return <LockedPrice {...props} isLoggedIn={!!buyer} />;
}
