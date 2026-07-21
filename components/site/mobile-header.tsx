"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  ["Início", "/#home", "home"],
  ["Serviços", "/#catalogo", "catalogo"],
  ["Sobre", "/#sobre", "sobre"],
  ["Contato", "/contato", "contato"],
] as const;

export function MobileHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [observedSection, setObservedSection] = useState<(typeof navItems)[number][2]>("home");
  const activeSection = pathname === "/contato" ? "contato" : observedSection;
  const headerClassName = `site-header${hidden ? " is-hidden" : ""}${mobileMenuOpen ? " is-menu-open" : ""}`;

  useEffect(() => {
    if (pathname === "/contato") {
      return;
    }

    const sectionIds = navItems.map((item) => item[2]).filter((id) => id !== "contato");
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setObservedSection(visible.target.id as (typeof navItems)[number][2]);
        }
      },
      {
        rootMargin: "-34% 0px -48% 0px",
        threshold: [0.05, 0.18, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isPastTop = currentScrollY > 72;
        const isScrollingDown = currentScrollY > lastScrollY + 2;

        setHidden(isPastTop && isScrollingDown);
        lastScrollY = Math.max(currentScrollY, 0);
        ticking = false;
      });

      ticking = true;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={headerClassName} aria-label="Navegação principal">
      <nav className="desktop-nav">
        <Link className={activeSection === navItems[0][2] ? "is-active" : undefined} href={navItems[0][1]}>
          {navItems[0][0]}
        </Link>
        <Link className={activeSection === navItems[1][2] ? "is-active" : undefined} href={navItems[1][1]}>
          {navItems[1][0]}
        </Link>
        <Link className="brand brand-logo-link" href="/#home" aria-label="Mobile Eventos">
          <Image src="/mobile-logo-white.png" alt="" width={600} height={473} unoptimized />
        </Link>
        <Link className={activeSection === navItems[2][2] ? "is-active" : undefined} href={navItems[2][1]}>
          {navItems[2][0]}
        </Link>
        <Link className={activeSection === navItems[3][2] ? "is-active" : undefined} href={navItems[3][1]}>
          {navItems[3][0]}
        </Link>
      </nav>
      <nav className={`mobile-nav${mobileMenuOpen ? " is-open" : ""}`} aria-label="Menu mobile">
        <div className="mobile-nav-bar">
          <span className="mobile-brand">
            <Image src="/mobile-logo-white.png" alt="" width={600} height={473} unoptimized />
            <span className="sr-only">Mobile Eventos</span>
          </span>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-menu-panel" id="mobile-menu-panel">
          {navItems.map(([label, href, id]) => (
            <Link
              className={activeSection === id ? "is-active" : undefined}
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
