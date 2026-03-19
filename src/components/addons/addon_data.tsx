import { GraduationCap, Frame } from "lucide-react";

export const StoleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M 4 22 L 4 10 A 8 8 0 0 1 20 10 L 20 22 L 17 18 L 14 22 L 14 10 L 10 10 L 10 22 L 7 18 Z" />
    <path d="M 7 18 L 7 10 A 5 5 0 0 1 17 10 L 17 18" />
  </svg>
);

export const addons = [
  { icon: GraduationCap, title: "Toga y Birrete", price: "$150", description: "Renta de toga y birrete de alta calidad para tu sesión fotográfica profesional." },
  { icon: StoleIcon, title: "Estola Personalizada", price: "$450", description: "Estola bordada con el nombre de tu universidad y carrera. Un recuerdo único de tu logro." },
  { icon: Frame, title: "Cuadros", price: "Desde $1,000", description: "Cuadros enmarcados con acabados premium para preservar tus mejores momentos por siempre." },
];
