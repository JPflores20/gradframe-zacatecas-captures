import { motion } from "framer-motion";

const AboutGradframe = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Col 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              Why GradFrame
            </h3>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl leading-tight mb-6">
              Expertos en Fotografía de Graduación
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GradFrame es una empresa especializada en fotografía de graduación, enfocada en ofrecer una experiencia organizada, cuidada y visualmente consistente para cada generación. Trabajamos con procesos claros, planeación previa y un equipo capacitado para cuidar cada detalle del evento y la sesión.
            </p>
          </motion.div>

          {/* Col 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary/40 p-10 rounded-3xl border border-primary/10 shadow-lg relative overflow-hidden group"
          >
            {/* Brillo sutil en el fondo */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            
            <h3 className="text-sm font-bold tracking-widest text-primary uppercase mb-3 relative z-10">
              How We Work
            </h3>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4 relative z-10">
              Nuestra Metodología
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
              Nuestra metodología se basa en organización, tiempos bien definidos y coordinación previa, garantizando una experiencia fluida y resultados de alta calidad.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutGradframe;
