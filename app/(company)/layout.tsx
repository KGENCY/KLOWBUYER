import AboutTabs from "@/components/about/AboutTabs";

/** About group (/about, /shipping, /ordering-payment, /faq): shared tab bar above each page. */
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AboutTabs />
      {children}
    </>
  );
}
