import { CONTACT_HREF } from "@/content/nav";

/** Fill in to open WhatsApp directly (digits only, with country code). Until then it goes to the contact form. */
const WHATSAPP_NUMBER = ""; // [NUMBER]

/** Fixed round chat button, bottom-end. Lifts above the sample bar when that bar is showing. */
export default function WhatsAppButton() {
  const href = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : CONTACT_HREF;
  return (
    <a
      className="wa"
      href={href}
      target={WHATSAPP_NUMBER ? "_blank" : undefined}
      rel={WHATSAPP_NUMBER ? "noopener noreferrer" : undefined}
      aria-label="Chat with KLOW on WhatsApp"
      data-cta-id="global_whatsapp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
        <path d="M12 2.8a9.2 9.2 0 0 0-7.9 13.9L2.8 21.2l4.6-1.2A9.2 9.2 0 1 0 12 2.8z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9.1 7.6c.3 0 .5.1.6.4l.8 1.9c.1.2 0 .5-.1.7l-.6.7c.6 1.2 1.6 2.2 2.8 2.8l.7-.6c.2-.2.5-.2.7-.1l1.9.8c.3.1.4.4.4.6v.6c0 .9-.8 1.6-1.7 1.5-3.6-.4-6.5-3.3-6.9-6.9-.1-.9.6-1.7 1.5-1.7z" fill="currentColor" />
      </svg>
      <span className="wa__tip">Chat on WhatsApp</span>
    </a>
  );
}
