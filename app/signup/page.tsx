import { Suspense } from "react";
import Signup from "@/components/Signup";

export const metadata = { title: "Become a verified buyer — KLOW Wholesale" };

export default function SignupPage() {
  return (
    <Suspense>
      <Signup mode="signup" />
    </Suspense>
  );
}
