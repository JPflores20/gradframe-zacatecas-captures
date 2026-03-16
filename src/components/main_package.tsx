import { Button } from "@/components/ui/button";
import { MessageCircle, Camera, Check } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/5215646831101?text=Hola%2C%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20paquete%20de%20tres%20sesiones";

// Agregamos algunas características de ejemplo para que las tarjetas se vean completas (puedes editarlas)
const session_types = [
  { 
    label: "Sesión Completa", 
    price: 1700,
    features: ["Fotos temáticas (o indivisuales)", "Fotos grupales", "Locación a elegir", "Edición profesional"]
  },
  { 
    label: "Sesión Temática", 
    price: 1200,
    features: ["Fotos con temática", "Locación especial", "Edición profesional"]
  },
  { 
    label: "Sesión de Gala", 
    price: 1200,
    features: ["Vestimenta formal", "Estudio o locación", "Edición profesional"]
  },
  { 
    label: "Sesión Familiar", 
    price: 1500,
    features: ["Fotos con familia", "Hasta 8 personas", "Encuadres especiales", "Edición profesional"]
  },
];

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

const MainPackage = () => (
  <section id="paquetes" className="py-24 bg-muted/30 relative">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Tipos de Sesión
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Elige la sesión que mejor se adapte a tu graduación. Desliza para ver todas las opciones disponibles.
        </p>
      </motion.div>

      {/* Contenedor tipo Carrete (Scroll Horizontal) */}
      <div 
        className="flex overflow-x-auto pb-8 pt-4 snap-x snap-mandatory gap-6 px-4 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {session_types.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="snap-center shrink-0 w-[280px] sm:w-[320px] rounded-2xl border bg-background shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            {/* Cabecera de la tarjeta */}
            <div className="p-6 border-b bg-muted/20 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold tracking-wide text-foreground">
                {item.label}
              </h3>
              <div className="mt-4">
                <span className="font-serif text-3xl font-bold text-foreground">
                  {fmt(item.price)}
                </span>
                <span className="text-xs text-muted-foreground block mt-1 uppercase tracking-wider font-semibold">
                  por persona
                </span>
              </div>
            </div>

            {/* Lista de características */}
            <div className="p-6 flex-grow bg-background">
              <ul className="space-y-4">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CSS para ocultar la barra de scroll en navegadores Webkit (Chrome, Safari) */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 flex justify-center"
      >
        <Button
          asChild
          size="lg"
          className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 px-8 py-6 rounded-full shadow-lg"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-6 w-6" />
            <span className="text-lg font-medium">Reservar por WhatsApp</span>
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default MainPackage;