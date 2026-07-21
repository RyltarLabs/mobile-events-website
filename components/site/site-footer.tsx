import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MapPin, MessageCircle, Star } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/catalog";

const googleReviewUrl =
  "https://www.google.com/search?q=mobile+eventos&oq=mobile&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MhAIAhAuGK8BGMcBGLEDGIAEMgoIAxAuGLEDGIAEMgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxMjE5ajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x7161007c1457bcb:0x10d7ba329d1441d9,3,,,,";

const socialLinks = [
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
    label: "E-mail",
    href: "mailto:contato@mobileeventos.com.br",
    icon: Mail,
  },
] as const;

const footerColumns = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "/#home", implemented: true },
      { label: "Sobre", href: "/#sobre", implemented: true },
      { label: "Eventos", href: "/#eventos", implemented: true },
      { label: "Contato", href: "/contato", implemented: true },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Casamentos", href: "#", implemented: false },
      { label: "Formaturas", href: "#", implemented: false },
      { label: "Aniversários", href: "#", implemented: false },
      { label: "Corporativo", href: "#", implemented: false },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Catálogo", href: "/#catalogo-vitrine", implemented: true },
      { label: "Orçamento", href: "/contato", implemented: true },
      { label: "Instagram", href: "https://www.instagram.com/mobileeventos/", implemented: true, external: true },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-main">
          <section className="footer-brand-block" aria-label="Mobile Eventos">
            <Link className="footer-logo" href="/#home" aria-label="Mobile Eventos">
              <Image src="/mobile-logo-white.png" alt="" width={600} height={473} unoptimized />
            </Link>
            <p className="footer-brand-title">Mobile Eventos</p>
            <p className="footer-brand-text">Locação de mobiliários exclusivos e cenografia para eventos memoráveis.</p>
            <div className="footer-contact-list">
              <a href="mailto:contato@mobileeventos.com.br">contato@mobileeventos.com.br</a>
              <a href={buildWhatsAppLink("orçamento geral")} target="_blank" rel="noreferrer">
                WhatsApp para orçamentos
              </a>
              <span>
                <MapPin aria-hidden="true" size={15} strokeWidth={1.6} />
                Salvador, região metropolitana e onde o seu evento acontecer
              </span>
            </div>
            <nav className="footer-social-list" aria-label="Canais sociais">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label}>
                  <Icon aria-hidden="true" size={18} strokeWidth={1.5} />
                </a>
              ))}
            </nav>
          </section>

          <nav className="footer-link-columns" aria-label="Links do rodapé">
            {footerColumns.map((column) => (
              <div className="footer-link-column" key={column.title}>
                <p>{column.title}</p>
                {column.links.map((link) =>
                  link.external || !link.implemented ? (
                    <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Mobile Eventos</p>
          <a className="footer-review-link" href={googleReviewUrl} target="_blank" rel="noreferrer">
            <Star aria-hidden="true" size={14} strokeWidth={1.7} />
            Avalie-nos no Google
          </a>
          <nav aria-label="Políticas">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
