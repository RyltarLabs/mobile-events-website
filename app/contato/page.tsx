import type { Metadata } from "next";
import Image from "next/image";
import { ContactPageForm } from "@/components/site/contact-page-form";
import { MobileHeader } from "@/components/site/mobile-header";
import { SiteFooter } from "@/components/site/site-footer";
import { buildWhatsAppLink } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contato | Mobile Eventos",
  description: "Fale com a Mobile Eventos pelo WhatsApp ou envie os dados do seu evento para orçamento.",
  openGraph: {
    title: "Contato | Mobile Eventos",
    description: "Solicite orçamento para mobiliário, cenografia e estrutura para eventos.",
  },
};

export default function ContactPage() {
  return (
    <main className="site-shell contact-page">
      <MobileHeader />

      <section className="contact-hero" aria-labelledby="contact-title">
        <Image
          className="contact-hero-image"
          src="/mobile-assets/8.jpg"
          alt="Ambientação de evento com flores e mobiliário em destaque"
          width={3024}
          height={3780}
          priority
          unoptimized
        />
        <div className="contact-hero-content">
          <a className="whatsapp-direct-button" href={buildWhatsAppLink("orçamento geral")} target="_blank" rel="noreferrer">
            Direto via WhatsApp
          </a>
          <p className="contact-or">ou</p>
          <div className="contact-form-card">
            <h1 id="contact-title" className="sr-only">
              Contato Mobile Eventos
            </h1>
            <ContactPageForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
