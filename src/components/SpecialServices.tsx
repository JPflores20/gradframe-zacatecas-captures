import { Card, CardContent } from "@/components/ui/card";
import { FileText, Image } from "lucide-react";
import { motion } from "framer-motion";

const titlePhotos = [
  { label: "UAZ", price: "$350" },
  { label: "ITZ", price: "$400" },
  { label: "Otras Universidades", price: "$580" },
];

const SpecialServices = () => (
  <section className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Servicios <span className="text-primary">Especiales</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Title Photos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="h-full border-border/50 bg-card">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">Fotos de Título</h3>
              </div>
              <div className="space-y-3">
                {titlePhotos.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/60 px-4 py-3">
                    <span className="text-sm text-foreground/80">{item.label}</span>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Printed Photos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="h-full border-border/50 bg-card">
            <CardContent className="flex h-full flex-col items-start justify-center p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Image className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">Fotos Impresas</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Impresiones de alta calidad en papel fotográfico profesional, perfectas para enmarcar o regalar.
              </p>
              <span className="mt-4 font-serif text-3xl font-bold text-primary">$320</span>
              <span className="text-xs text-muted-foreground">MXN por paquete</span>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  </section>
);

export default SpecialServices;
