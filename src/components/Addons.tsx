import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Ribbon, Frame } from "lucide-react";
import { motion, Variants } from "framer-motion";

const addons = [
  {
    icon: GraduationCap,
    title: "Toga y Birrete",
    price: "$150",
    description: "Renta de toga y birrete de alta calidad para tu sesión fotográfica profesional.",
  },
  {
    icon: Ribbon,
    title: "Estola Personalizada",
    price: "$450",
    description: "Estola bordada con el nombre de tu universidad y carrera. Un recuerdo único de tu logro.",
  },
  {
    icon: Frame,
    title: "Cuadros",
    price: "Desde $1,000",
    description: "Cuadros enmarcados con acabados premium para preservar tus mejores momentos por siempre.",
  },
];

// Variantes para el efecto de aparición en cascada
const container_variants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item_variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const Addons = () => (
  <section id="addons" className="border-y bg-secondary/30 py-24 relative overflow-hidden">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Lleva tu recuerdo al siguiente nivel</span>
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Personaliza tu Paquete
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
          Complementa tu experiencia con estos servicios adicionales de primera calidad.
        </p>
      </motion.div>

      <motion.div 
        variants={container_variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {addons.map((addon) => (
          <motion.div
            key={addon.title}
            variants={item_variants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="h-full group cursor-pointer"
          >
            <Card className="h-full border border-border/50 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
              <CardContent className="flex flex-col items-start gap-5 p-8 relative overflow-hidden">
                {/* Resplandor sutil en la esquina de la tarjeta al hacer hover */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                
                <motion.div 
                  className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors duration-300 group-hover:bg-primary group-hover:border-primary z-10"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <addon.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </motion.div>
                
                <div className="z-10">
                  <h3 className="font-serif text-2xl font-bold text-foreground">{addon.title}</h3>
                  <span className="mt-2 inline-block font-sans text-xl font-bold text-primary">{addon.price}</span>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground z-10">{addon.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Addons;