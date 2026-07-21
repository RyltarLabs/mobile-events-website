import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/catalog";

const footerChannels = [
  {
    label: "WhatsApp",
    href: buildWhatsAppLink("orçamento geral"),
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mobileeventos/",
    icon: Camera,
  },
  {
    label: "Gmail",
    href: "mailto:contato@mobileeventos.com.br",
    icon: Mail,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-group footer-company">
          <p>Empresa</p>
          <Link href="/contato">Contato</Link>
          <a href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
        <div className="footer-group footer-policies">
          <p>Links</p>
          <Link href="/#catalogo">Catálogo</Link>
          <Link href="/#eventos">Eventos</Link>
        </div>
        <Link className="footer-logo" href="/#home" aria-label="Mobile Eventos">
          <Image src="/mobile-logo-white.png" alt="" width={600} height={473} unoptimized />
        </Link>
        <div className="footer-brand-copy">
          <p>Empresa de locação de mobiliários exclusivos e cenografia</p>
          <nav className="footer-channel-list" aria-label="Canais de contato">
            {footerChannels.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <small>copyright Mobile Eventos.</small>
        </div>
      </div>
    </footer>
  );
}
