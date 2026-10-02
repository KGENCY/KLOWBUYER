import { Suspense } from "react";
import Signup from "@/components/Signup";

export const metadata = { title: "Sign in — KLOW Wholesale" };

export default function SigninPage() {
  return (
    <Suspense>
      <Signup mode="signin" />
    </Suspense>
  );
}
