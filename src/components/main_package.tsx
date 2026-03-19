import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_WHATSAPP_NUMBER } from "@/utils/constants";
import Addons from "@/components/addons";
import { PackageCarousel } from "./packages/package_carousel";

const WHATSAPP_URL =
  `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=Hola%2C%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20paquete%20de%20tres%20sesiones`;

const MainPackage = () => (
  <section id="paquetes" className="py-24 bg-muted/30 relative overflow-hidden">
    
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-background to-transparent opacity-80 z-0 pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Descubre nuestras opciones</span>
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Tipos de Sesión
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
          Elige la sesión que mejor se adapte a tu graduación. Desliza para ver todas las opciones disponibles.
        </p>
      </motion.div>

      <PackageCarousel />
    </div>

    {/* Foto Muestra 1 (Panorámica de Extremo a Extremo) */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full my-16 shadow-2xl overflow-hidden h-[20vh] sm:h-[25vh] md:h-[35vh] lg:h-[40vh] max-h-[450px]"
    >
      <img src="/1.jpeg" alt="Muestra de fotografía de graduación" className="w-full h-full object-cover object-[center_60%] hover:scale-105 transition-transform duration-1000" />
    </motion.div>

    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Addons />
    </div>
  </section>
);

export default MainPackage;