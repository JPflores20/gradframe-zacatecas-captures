import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Ribbon, Frame } from "lucide-react";
import { motion } from "framer-motion";

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

const Addons = () => (
  <section id="addons" className="bg-secondary/50 py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Personaliza tu <span className="text-primary">Paquete</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Complementa tu experiencia con estos servicios adicionales de primera calidad.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addons.map((addon, i) => (
          <motion.div
            key={addon.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border-border/50 bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5">
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <addon.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{addon.title}</h3>
                  <span className="mt-1 inline-block font-sans text-lg font-bold text-primary">{addon.price}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{addon.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Addons;
