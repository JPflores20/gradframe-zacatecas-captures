import { Button } from "@/components/ui/button";
import { MessageCircle, Camera, Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_WHATSAPP_NUMBER } from "@/utils/constants";
import Addons from "@/components/addons";

// Usamos la constante aquí también para mantener la consistencia
const WHATSAPP_URL =
  `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=Hola%2C%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20paquete%20de%20tres%20sesiones`;

const session_types = [
  { 
    label: "Sesión de Gala", 
    price: 1200,
    features: ["Vestimenta formal", "Solo gala", "Estudio o locación", "Edición profesional"]
  },
  { 
    label: "Paquete Base", 
    price: 1700,
    features: [
      "INCLUYE SESIÓN FAMILIAR, TEMÁTICA Y GALA", 
      "ENTREGA DE ÁLBUM DIGITAL", 
      "Cotización grupal a partir de 8 personas", 
      "Múltiples localizaciones"
    ],
    badge: "¡El Más Completo y Recomendado!"
  },
  { 
    label: "Sesión Temática", 
    price: 1200,
    features: ["Fotos con temática específica", "Solo temática", "Locación especial", "Edición profesional"]
  },
  { 
    label: "Sesión Familiar", 
    price: 1500,
    features: ["Fotos con familia", "Solo fotos familiares", "Hasta 8 personas", "Edición profesional"]
  },
];

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

const MainPackage = () => (
  <section id="paquetes" className="py-24 bg-muted/30 relative overflow-hidden">
    
    {/* Decoración de fondo */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-background to-transparent opacity-80 z-0 pointer-events-none" />

    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
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

      {/* Contenedor tipo Carrete (Scroll Horizontal) */}
      <div 
        className="flex overflow-x-auto pb-12 pt-4 snap-x snap-mandatory gap-6 px-4 md:px-2 items-center lg:justify-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {session_types.map((item, i) => {
          const isCompleta = item.label === "Paquete Base";
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ y: -15, scale: isCompleta ? 1.08 : 1.01 }}
            className={`snap-center shrink-0 w-[280px] sm:w-[320px] rounded-3xl border flex flex-col cursor-pointer group transition-all duration-300 overflow-hidden shadow-sm ${
              isCompleta
                ? "border-primary/80 bg-background shadow-2xl shadow-primary/30 scale-105 z-20 border-2 my-4 relative"
                : "border-border/50 bg-background/40 scale-95 opacity-70 hover:opacity-100 hover:scale-[0.98] hover:bg-background/80 hover:shadow-xl hover:border-primary/30 z-10"
            }`}
          >
            {/* Cabecera de la tarjeta */}
            <div className={`p-8 border-b border-border/50 ${item.badge ? 'bg-gradient-to-b from-primary/15 to-transparent' : 'bg-gradient-to-b from-muted/30 to-transparent'} flex flex-col items-center text-center relative overflow-hidden`}>
              {/* Badge si aplica */}
              {item.badge && (
                <div className="absolute top-0 inset-x-0 mx-auto w-full bg-primary text-primary-foreground text-sm font-bold px-4 py-2 text-center uppercase tracking-widest shadow-md z-20">
                  {item.badge}
                </div>
              )}
              {/* Brillo sutil de fondo en la tarjeta */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
              
              <motion.div 
                className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 relative z-10 transition-colors duration-300 ${isCompleta ? 'bg-primary text-primary-foreground mt-8' : 'bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground'}`}
                whileHover={{ rotate: 10 }}
              >
                <Camera className={`h-7 w-7 transition-colors ${isCompleta ? 'text-primary-foreground' : 'text-primary group-hover:text-white'}`} />
              </motion.div>
              <h3 className={`font-serif text-2xl font-bold tracking-wide relative z-10 ${isCompleta ? 'text-primary text-3xl' : 'text-foreground'}`}>
                {item.label}
              </h3>
              <div className="mt-4 relative z-10">
                <span className={`font-serif font-bold text-foreground ${isCompleta ? 'text-5xl' : 'text-4xl'}`}>
                  {fmt(item.price)}
                </span>
                <span className="text-xs text-muted-foreground block mt-1 uppercase tracking-wider font-semibold">
                  por persona
                </span>
              </div>
            </div>

            {/* Lista de características */}
            <div className={`p-8 flex-grow ${isCompleta ? 'bg-primary/5' : 'bg-transparent'}`}>
              <ul className="space-y-4">
                {item.features.map((feature, idx) => {
                  const isHighlight = isCompleta && (feature.includes("INCLUYE") || feature.includes("ENTREGA") || feature.includes("Cotización grupal"));
                  return (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex items-start"
                    >
                      <div className={`mt-0.5 mr-3 rounded-full p-1 shrink-0 ${isCompleta ? 'bg-primary/20' : 'bg-green-100'}`}>
                        <Check className={`h-3 w-3 ${isCompleta ? 'text-primary' : 'text-green-600'}`} />
                      </div>
                      <span className={`text-sm leading-tight ${isHighlight ? 'text-foreground font-bold' : 'text-muted-foreground font-medium'}`}>
                        {feature}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
          );
        })}
      </div>

      {/* CSS para ocultar la barra de scroll */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>

    {/* Foto Muestra 1 (Panorámica de Extremo a Extremo) */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full my-16 shadow-2xl overflow-hidden h-[20vh] sm:h-[25vh] md:h-[35vh] lg:h-[40vh] max-h-[450px]"
    >
      <img 
        src="/1.jpeg" 
        alt="Muestra de fotografía de graduación" 
        className="w-full h-full object-cover object-[center_60%] hover:scale-105 transition-transform duration-1000" 
      />
    </motion.div>

    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Sección Integrada de Extras/Personaliza tu Paquete */}
      <Addons />

      {/* CTA de WhatsApp con animación de pulso */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        className="mt-4 flex justify-center"
      >
        <div className="relative group">
          {/* Capa de resplandor animado detrás del botón */}
          <div className="absolute -inset-1 rounded-full bg-whatsapp opacity-40 blur-md group-hover:opacity-60 group-hover:blur-lg animate-pulse transition-all duration-500"></div>
          
          <Button
            asChild
            size="lg"
            className="relative bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 px-8 py-7 rounded-full shadow-lg hover:-translate-y-1 transition-transform duration-300"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <MessageCircle className="h-6 w-6" />
              <span className="text-lg font-semibold tracking-wide">Reservar por WhatsApp</span>
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default MainPackage;