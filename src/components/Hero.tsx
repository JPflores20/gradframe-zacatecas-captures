import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
  >
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.08),transparent_60%)]" />

    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
          Zacatecas, México
        </span>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to the{" "}
          <span className="text-primary">GradFrame</span>{" "}
          Experience
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground sm:text-xl">
          Capturando la culminación de tu esfuerzo.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-gold-light"
          >
            <a href="#paquetes">Ver Paquetes</a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
