import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/catalog";

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
          <p>Empresa de design e locação para eventos.</p>
          <span>Atendendo Salvador, região metropolitana e onde o seu evento acontecer.</span>
          <nav aria-label="Redes sociais e contato">
            <a href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
              in
            </a>
            <a href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
              ig
            </a>
            <a href={buildWhatsAppLink("orçamento geral")} target="_blank" rel="noreferrer">
              wa
            </a>
            <a href="mailto:contato@mobileeventos.com.br">em</a>
          </nav>
          <small>copyright Mobile Eventos.</small>
        </div>
      </div>
    </footer>
  );
}
