import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const estolas = [
  { image: "/Estolas/Estola1.avif", alt: "Estola ejemplo 1" },
  { image: "/Estolas/Estola2.avif", alt: "Estola ejemplo 2" },
  { image: "/Estolas/Estola3.avif", alt: "Estola ejemplo 3" },
  { image: "/Estolas/Estola4.avif", alt: "Estola ejemplo 4" },
  { image: "/Estolas/Estola5.avif", alt: "Estola ejemplo 5" },
];

const Estolas = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-foreground">GF</span>
          <span className="hidden font-serif text-lg font-medium text-muted-foreground sm:inline">
            /&nbsp;GradFrame
          </span>
        </a>
      </div>
    </header>

    {/* Hero section */}
    <section className="border-b bg-secondary/30 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block border border-border px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Galería
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Estolas Personalizadas
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground sm:text-xl">
            Bordadas con el nombre de tu universidad y carrera. Un recuerdo único de tu logro.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Gallery grid */}
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {estolas.map((estola, i) => (
            <motion.div
              key={estola.alt}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mb-6 break-inside-avoid"
            >
              <div className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="overflow-hidden">
                  <img
                    src={estola.image}
                    alt={estola.alt}
                    className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Back button */}
    <section className="border-t py-12">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <Button asChild variant="outline" size="lg" className="gap-2">
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>
        </Button>
      </div>
    </section>
  </div>
);

export default Estolas;
