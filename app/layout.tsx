import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mobile-eventos.example"),
  title: "Mobile Eventos | Design e locação para eventos em Salvador",
  description:
    "Locação de mobiliário, cenografia, lounges, mesas, cadeiras e estruturas premium para eventos em Salvador, Bahia.",
  openGraph: {
    title: "Mobile Eventos | Design e locação para eventos",
    description:
      "Catálogo-vitrine de mobiliário e cenografia premium para casamentos, propostas, eventos corporativos e festas.",
    images: ["/mobile-assets/2.jpg"],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Eventos | Design e locação para eventos",
    description: "Mobiliário, cenografia e estruturas premium para eventos.",
    images: ["/mobile-assets/2.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
