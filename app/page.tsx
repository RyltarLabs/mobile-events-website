import Image from "next/image";
import Link from "next/link";
import { catalogItems, buildWhatsAppLink } from "@/lib/catalog";
import { MobileHeader } from "@/components/site/mobile-header";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { TestimonialsCarousel } from "@/components/site/testimonials-carousel";

const gallery = [
  { src: "/mobile-assets/20.jpg", alt: "Mesas e cadeiras em ambiente verde para evento", className: "tile tile-a" },
  { src: "/mobile-assets/24.jpg", alt: "Lounge com mobiliário de fibra natural e mesas de apoio", className: "tile tile-b" },
  { src: "/mobile-assets/7.jpg", alt: "Ambientação com pendentes, flores e banco estofado", className: "tile tile-c" },
  { src: "/mobile-assets/8.jpg", alt: "Detalhe de flores e luminárias pendentes", className: "tile tile-d" },
  { src: "/mobile-assets/25.jpg", alt: "Mesa de bolo com cenografia floral amarela", className: "tile tile-e" },
  { src: "/mobile-assets/10.jpg", alt: "Mesa posta com arranjos e iluminação cênica", className: "tile tile-f" },
  { src: "/mobile-assets/21.jpg", alt: "Salão de evento com vegetação, mesas e cadeiras", className: "tile tile-g" },
  { src: "/mobile-assets/9.jpg", alt: "Lounge rosado com mesas e arranjos florais", className: "tile tile-h" },
];

const services = [
  { label: "Casamentos", href: "#" },
  { label: "Formaturas", href: "#" },
  { label: "Aniversários", href: "#" },
  { label: "Corporativo", href: "#" },
];

export default function Home() {
  return (
    <main id="home" className="site-shell">
      <ScrollReveal />
      <MobileHeader />

      <section className="hero-section" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/mobile-assets/24.jpg"
          alt="Lounge com mobiliário exclusivo, flores e ambientação para evento"
          width={1440}
          height={1920}
          priority
          unoptimized
        />
        <div className="hero-copy reveal is-visible">
          <h1 id="hero-title" aria-label="Mobiliários exclusivos & cenografia">
            <span className="hero-title-set hero-title-set-desktop" aria-hidden="true">
              <span className="hero-title-line">Mobiliários exclusivos</span>
              <span className="hero-title-line">& cenografia</span>
            </span>
            <span className="hero-title-set hero-title-set-mid" aria-hidden="true">
              <span className="hero-title-line">Mobiliários</span>
              <span className="hero-title-line">exclusivos &</span>
              <span className="hero-title-line">cenografia</span>
            </span>
            <span className="hero-title-set hero-title-set-mobile" aria-hidden="true">
              <span className="hero-title-line">Mobiliários</span>
              <span className="hero-title-line">exclusivos</span>
              <span className="hero-title-line hero-title-amp">&</span>
              <span className="hero-title-line">cenografia</span>
            </span>
          </h1>
          <a className="micro-link light" href="#sobre">
            Navegar
          </a>
        </div>
      </section>

      <section id="sobre" className="intro-section" aria-labelledby="about-title">
        <div className="intro-image reveal">
          <Image
            src="/mobile-assets/25.jpg"
            alt="Cenografia floral com mesa de bolo para evento"
            width={1440}
            height={1920}
            unoptimized
          />
        </div>
        <div className="intro-copy reveal">
          <h2 id="about-title">
            <span>A Mobile traduz</span>
            <span>celebrações em ambientes</span>
            <span>memoráveis.</span>
          </h2>
          <p className="intro-service-copy">
            <span>Mobiliários. Cenografia. Estrutura.</span>
            <span>Movidos pela satisfação de transformar ideias em ambientes memoráveis.</span>
          </p>
          <button className="small-button" type="button">
            Conheça
          </button>
        </div>
      </section>

      <section className="vision-band reveal" aria-labelledby="vision-title">
        <video
          className="vision-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/mobile-assets/5.jpg"
          aria-label="Vídeo de bastidores e ambientação da Mobile Eventos"
        >
          <source src="/mobile-assets/snapinsta-1784518426556.mp4" type="video/mp4" />
        </video>
        <h2 id="vision-title">Tiramos sua visão do papel</h2>
      </section>

      <section className="statement-section reveal" aria-labelledby="statement-title">
        <p className="eyebrow">Nossa missão</p>
        <h2 id="statement-title">
          Produzir trabalhos <em>sob medida</em>, personalizados ao seu <em>estilo</em>, <em>orçamento</em> e
          necessidades.
        </h2>
      </section>

      <section id="eventos" className="gallery-section" aria-label="Eventos e composições">
        <div className="gallery-grid">
          {gallery.map((item) => (
            <figure key={item.src} className={`${item.className} reveal`}>
              <Image src={item.src} alt={item.alt} width={780} height={980} unoptimized />
            </figure>
          ))}
        </div>
      </section>

      <TestimonialsCarousel />

      <section id="catalogo" className="services-section reveal" aria-labelledby="catalog-title">
        <h2 id="catalog-title">Locar / Criar / Realizar</h2>
        <p className="eyebrow">Nossos serviços</p>
        <div className="services-list">
          {services.map((service) => (
            <button key={service.label} type="button">
              {service.label}
            </button>
          ))}
        </div>
      </section>

      <section id="catalogo-vitrine" className="catalog-section" aria-labelledby="catalog-products-title">
        <div className="section-heading reveal">
          <p className="eyebrow">Catálogo</p>
          <h2 id="catalog-products-title">Peças selecionadas para eventos memoráveis.</h2>
        </div>
        <div className="catalog-grid">
          {catalogItems.map((item) => (
            <article className="product-card reveal" key={item.name}>
              <Image src={item.image} alt={item.alt} width={780} height={980} unoptimized />
              <div className="product-copy">
                <p>{item.category}</p>
                <h3>{item.name}</h3>
                <span>{item.description}</span>
                <a href={buildWhatsAppLink(item.name)} target="_blank" rel="noreferrer">
                  Solicitar orçamento
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band reveal" aria-labelledby="contact-band-title">
        <Image
          src="/mobile-assets/3.jpg"
          alt="Lounge com sofá branco, tapete e mesas de apoio para evento"
          width={1510}
          height={951}
          unoptimized
        />
        <div>
          <h2 id="contact-band-title">Vamos conversar sobre seu próximo evento?</h2>
          <Link className="small-button" href="/contato">
            Entrar em contato
          </Link>
        </div>
      </section>

      <section className="instagram-section reveal" aria-labelledby="instagram-title">
        <div className="instagram-copy">
          <h2 id="instagram-title">Fique por dentro</h2>
          <a className="small-button muted" href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
            Ver novidades
          </a>
          <a className="instagram-link instagram-link-mobile" href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
            & visite nosso instagram
          </a>
        </div>
        <div className="instagram-collage" aria-label="Bastidores e referências de eventos">
          <Image className="insta-a" src="/mobile-assets/20.jpg" alt="Mesa com cadeiras em ambiente verde" width={1440} height={1920} unoptimized />
          <a className="insta-handle-left" href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
            @mobileeventos
          </a>
          <a className="instagram-link instagram-link-desktop" href="https://www.instagram.com/mobileeventos/" target="_blank" rel="noreferrer">
            & visite nosso instagram
          </a>
          <Image className="insta-b" src="/mobile-assets/25.jpg" alt="Cenografia floral amarela" width={1440} height={1920} unoptimized />
          <Image className="insta-c" src="/mobile-assets/24.jpg" alt="Lounge com mobiliário natural" width={1440} height={1920} unoptimized />
          <Image className="insta-d" src="/mobile-assets/8.jpg" alt="Detalhe de arranjos e iluminação" width={3024} height={3780} unoptimized />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
