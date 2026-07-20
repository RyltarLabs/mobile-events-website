"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  ["Início", "/#home"],
  ["Serviços", "/#catalogo"],
  ["Sobre", "/#sobre"],
  ["Contato", "/contato"],
] as const;

export function MobileHeader() {
  const [hidden, setHidden] = useState(false);

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
    <header className={`site-header${hidden ? " is-hidden" : ""}`} aria-label="Navegação principal">
      <nav className="desktop-nav">
        <Link href={navItems[0][1]}>{navItems[0][0]}</Link>
        <Link href={navItems[1][1]}>{navItems[1][0]}</Link>
        <Link className="brand brand-logo-link" href="/#home" aria-label="Mobile Eventos">
          <Image src="/mobile-logo-white.png" alt="" width={600} height={473} unoptimized />
        </Link>
        <Link href={navItems[2][1]}>{navItems[2][0]}</Link>
        <Link href={navItems[3][1]}>{navItems[3][0]}</Link>
      </nav>
      <details className="mobile-nav">
        <summary>
          <span className="mobile-brand">
            <Image src="/mobile-logo-white.png" alt="" width={600} height={473} unoptimized />
            <span className="sr-only">Mobile Eventos</span>
          </span>
          <span aria-hidden="true">Menu</span>
        </summary>
        <div>
          {navItems.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </details>
    </header>
  );
}
