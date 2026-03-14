import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const cuadros = [
  {
    image: "/Cuadros/CUADRO GRANDE F1.avif",
    title: "CUADRO GRANDE F1",
    price: "$2,200.00",
  },
  {
    image: "/Cuadros/CUADRO PEQUEÑO F2.avif",
    title: "CUADRO PEQUEÑO F2",
    price: "$1,400.00",
  },
  {
    image: "/Cuadros/CUADRO GRANDE MDF.avif",
    title: "CUADRO GRANDE MDF",
    price: "$1,700.00",
  },
  {
    image: "/Cuadros/CUADRO PEQUEÑO MDF.avif",
    title: "CUADRO PEQUEÑO MDF",
    price: "$1,100.00",
  },
  {
    image: "/Cuadros/CUADRO GRANDE MINIMALISTA.avif",
    title: "CUADRO GRANDE MINIMALISTA",
    price: "$1,200.00",
  },
  {
    image: "/Cuadros/CUADRO PEQUEÑO MINIMALISTA.avif",
    title: "CUADRO PEQUEÑO MINIMALISTA",
    price: "$900.00",
  },
];

const Cuadros = () => (
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
            Catálogo
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Modelos de Cuadros
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground sm:text-xl">
            Totalmente personalizado, tú eliges tus fotos y lo que diga la placa de agradecimiento.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Product grid */}
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cuadros.map((cuadro, i) => (
            <motion.div
              key={cuadro.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={cuadro.image}
                    alt={cuadro.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {cuadro.title}
                  </h3>
                  <p className="mt-2 font-sans text-2xl font-bold text-foreground">
                    {cuadro.price}
                  </p>
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

export default Cuadros;
