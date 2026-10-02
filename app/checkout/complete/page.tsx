import { Suspense } from "react";
import Complete from "@/components/Complete";

export const metadata = { title: "Request placed — KLOW Wholesale" };

export default function CompletePage() {
  return (
    <Suspense>
      <Complete />
    </Suspense>
  );
}
