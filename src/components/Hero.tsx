import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => (
  <section
    id="home"
    className="relative flex flex-col items-center justify-center overflow-hidden pt-16"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />

    <div className="relative z-10 mx-auto max-w-4xl px-4 pt-24 text-center sm:pt-32">
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
        <img
          src="/GF_logo.avif"
          alt="GradFrame Logo"
          className="mx-auto mt-8 h-20 w-auto object-contain sm:h-24 md:h-28"
        />
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

    {/* Hero showcase image */}
    <motion.div
      className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-4 pb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
    >
      <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
        <img
          src="/Graduados1.avif"
          alt="Graduados celebrando"
          className="h-auto w-full object-cover"
        />
      </div>
    </motion.div>
  </section>
);

export default Hero;
