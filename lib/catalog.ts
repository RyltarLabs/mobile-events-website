const whatsappNumber = "5571999999999";

export const catalogItems = [
  {
    name: "Sofá branco para lounge",
    category: "Locação para eventos",
    image: "/mobile-assets/3.jpg",
    alt: "Sofá branco em lounge para evento",
    description: "Base elegante para lounges, recepções e áreas de descanso.",
  },
  {
    name: "Lounge fibra natural",
    category: "Mobiliário exclusivo",
    image: "/mobile-assets/24.jpg",
    alt: "Lounge com sofá de fibra natural, mesas e arranjos",
    description: "Composição acolhedora para recepções, festas e áreas de convivência.",
  },
  {
    name: "Mesa posta jardim",
    category: "Design de casamentos",
    image: "/mobile-assets/20.jpg",
    alt: "Mesa posta com cadeiras de madeira em ambientação verde",
    description: "Mesa, cadeiras e curadoria visual para celebrações ao ar livre.",
  },
  {
    name: "Cenografia floral",
    category: "Cenografia sob medida",
    image: "/mobile-assets/25.jpg",
    alt: "Mesa de bolo com cenografia floral amarela",
    description: "Cenários com flores, bases e elementos de destaque para fotos.",
  },
  {
    name: "Iluminação e pendentes",
    category: "Estrutura para eventos",
    image: "/mobile-assets/8.jpg",
    alt: "Luminárias pendentes e arranjos florais em salão de evento",
    description: "Ambientação luminosa para valorizar salões, lounges e mesas.",
  },
  {
    name: "Composição de salão",
    category: "Eventos completos",
    image: "/mobile-assets/9.jpg",
    alt: "Salão com lounges, mesas de apoio e arranjos florais",
    description: "Mobiliário e cenografia integrados para eventos sociais e corporativos.",
  },
] as const;

export function buildWhatsAppLink(productName: string) {
  const text = `Olá, vim pelo site da Mobile Eventos e gostaria de solicitar um orçamento para: ${productName}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
