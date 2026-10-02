import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__in">
        <div>
          <div className="wordmark wordmark--left wordmark--light">
            <span className="wordmark__k">KLOW</span>
            <span className="wordmark__w">Wholesale</span>
          </div>
          <p className="muted small">Korean beauty, sourced directly from the brands — for distributors, retailers and professionals worldwide.</p>
        </div>
        <div className="footer__cols">
          <div><span className="eyebrow">Source</span><Link href="/#collection">Collection</Link><Link href="/#brands">Brands</Link><Link href="/match">Find my brands</Link></div>
          <div><span className="eyebrow">Program</span><Link href="/#sampling">Sampling</Link><span>Wholesale tiers</span><span>Documentation</span></div>
          <div><span className="eyebrow">Company</span><span>About</span><span>Partner with us</span><span>Contact</span></div>
        </div>
      </div>
      <div className="wrap footer__base"><span>© 2026 KLOW Wholesale</span><span>Seoul → Worldwide</span></div>
    </footer>
  );
}
