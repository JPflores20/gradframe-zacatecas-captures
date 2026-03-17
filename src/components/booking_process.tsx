import { Monitor, CalendarDays, MessageCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

const steps = [
  {
    icon: Monitor,
    step: "01",
    title: "Elige Modalidad",
    description: "Presencial en Zacatecas o sesión virtual por Meet en línea.",
  },
  {
    icon: CalendarDays,
    step: "02",
    title: "Selecciona Fecha y Hora",
    description: "Escoge el día y horario que mejor se acomode a tu agenda. Puedes consultar nuestros días disponibles en la sección de Agenda pública.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Confirmación vía WhatsApp",
    description: "Recibe la confirmación de tu reserva directamente por WhatsApp.",
  },
];

const container_variants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const step_variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const BookingProcess = () => (
  <section className="bg-background py-24 relative">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Es muy rápido y sencillo</span>
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          Cómo Reservar
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
          Tres sencillos pasos para asegurar tu sesión fotográfica.
        </p>
      </motion.div>

      <motion.div 
        variants={container_variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-20 grid gap-12 md:grid-cols-3 relative"
      >
        {/* Línea conectora visual (se oculta en móviles) */}
        <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent z-0" />

        {steps.map((s) => (
          <motion.div
            key={s.step}
            variants={step_variants}
            className="text-center group relative z-10 cursor-pointer"
          >
            {/* Círculo animado al hacer hover */}
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-background bg-secondary shadow-lg transition-colors duration-300 group-hover:bg-primary group-hover:border-primary/30"
            >
              <s.icon className="h-8 w-8 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              
              {/* Badge del número de paso */}
              <motion.span 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-sans text-xs font-bold text-background shadow-sm transition-colors duration-300 group-hover:bg-background group-hover:text-foreground"
              >
                {s.step}
              </motion.span>
            </motion.div>
            
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{s.title}</h3>
            <p className="mx-auto mt-3 max-w-[250px] text-base text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default BookingProcess;