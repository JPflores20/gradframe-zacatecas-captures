import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Frame, Calculator } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PackageCalculator } from "@/components/package_calculator";

const StoleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M 4 22 L 4 10 A 8 8 0 0 1 20 10 L 20 22 L 17 18 L 14 22 L 14 10 L 10 10 L 10 22 L 7 18 Z" />
    <path d="M 7 18 L 7 10 A 5 5 0 0 1 17 10 L 17 18" />
  </svg>
);

const addons = [
  {
    icon: GraduationCap,
    title: "Toga y Birrete",
    price: "$150",
    description: "Renta de toga y birrete de alta calidad para tu sesión fotográfica profesional.",
  },
  {
    icon: StoleIcon,
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
  <div id="addons" className="pt-8 pb-12 relative overflow-hidden mt-4">
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
              <CardContent className="flex flex-col items-center text-center gap-5 p-8 relative overflow-hidden">
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

      {/* Botón del Cotizador Grande */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:-translate-y-1 hover:shadow-primary/40 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 px-8 py-2 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
              <Calculator className="h-7 w-7" />
              Calcula el Precio de tu Paquete
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] p-0 border-none bg-transparent shadow-none w-[95vw]">
            <DialogTitle className="sr-only">Cotizador de Paquetes</DialogTitle>
            <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-background shadow-2xl">
              <PackageCalculator />
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

    </div>
  </div>
);

export default Addons;