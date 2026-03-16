import { Button } from "@/components/ui/button";
import { MessageCircle, Camera, Plus } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/5215646831101?text=Hola%2C%20quisiera%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20paquete%20de%20tres%20sesiones";

const session_types = [
  { label: "Sesión Completa", price: 1700 },
  { label: "Sesión Temática", price: 1200 },
  { label: "Sesión de Gala", price: 1200 },
  { label: "Sesión Familiar", price: 1500 },
];

const add_ons = [
  { label: "Toga y Birrete", price: 150 },
  { label: "Estola Personalizada", price: 450 },
  { label: "Cuadro a elección", price: null },
];

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

const MainPackage = () => (
  <section id="paquetes" className="py-24 bg-muted/30">
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
          Precios y Servicios
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Elige la sesión que mejor se adapte a tu graduación y personaliza con los adicionales que desees.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Tipos de Sesiones */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border bg-background shadow-sm overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b bg-muted/40">
            <Camera className="h-5 w-5 text-foreground" />
            <h3 className="font-serif text-lg font-semibold tracking-wide uppercase text-foreground">
              Tipos de Sesión
            </h3>
          </div>
          <div className="divide-y">
            {session_types.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="font-serif text-base font-bold text-foreground">
                  {fmt(item.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-muted/20 border-t">
            <p className="text-xs text-muted-foreground">Precio por persona · IVA incluido</p>
          </div>
        </motion.div>

        {/* Adicionales */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border bg-background shadow-sm overflow-hidden"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b bg-muted/40">
            <Plus className="h-5 w-5 text-foreground" />
            <h3 className="font-serif text-lg font-semibold tracking-wide uppercase text-foreground">
              Adicionales
            </h3>
          </div>
          <div className="divide-y">
            {add_ons.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="font-serif text-base font-bold text-foreground">
                  {item.price !== null ? fmt(item.price) : "A consultar"}
                </span>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-muted/20 border-t">
            <p className="text-xs text-muted-foreground">Precios por pieza · Sujetos a disponibilidad</p>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex justify-center"
      >
        <Button
          asChild
          size="lg"
          className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90 px-8"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-5 w-5" />
            Reservar por WhatsApp
          </a>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default MainPackage;