import { motion } from "framer-motion";

const Testimonios = () => (
  <section id="testimonios" className="border-y bg-secondary/50 py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Casos de Éxito</span>
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Lo que dicen nuestros graduados
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
          Experiencias reales de quienes vivieron la experiencia GradFrame.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center"
      >
        <img 
          src="/testimonios.png" 
          alt="Testimonios de nuestros graduados" 
          className="w-full max-w-5xl h-auto rounded-xl shadow-lg border border-border/50 object-contain"
        />
      </motion.div>
    </div>
  </section>
);

export default Testimonios;
