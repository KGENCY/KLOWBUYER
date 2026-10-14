import SubTabs from "@/components/section/SubTabs";
import { ABOUT_LINKS } from "@/content/navigation";

/** About group (/about, /shipping, /ordering-payment, /faq): shared tab bar above each page. */
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubTabs links={ABOUT_LINKS} label="About KLOW" />
      {children}
    </>
  );
}
