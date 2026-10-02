import { Suspense } from "react";
import Account from "@/components/Account";

export const metadata = { title: "My account — KLOW Wholesale" };

export default function AccountPage() {
  return (
    <Suspense>
      <Account />
    </Suspense>
  );
}
