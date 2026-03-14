import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => (
  <section
    id="home"
    className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />

    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="mb-4 inline-block border border-border px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Zacatecas, México
        </span>
        <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to the{" "}
          <span className="italic">GradFrame</span>{" "}
          Experience
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground sm:text-xl">
          Capturando la culminación de tu esfuerzo.
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="px-10 text-sm font-semibold uppercase tracking-wider"
          >
            <a href="#paquetes">Ver Paquetes</a>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
