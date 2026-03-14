import { Monitor, CalendarDays, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    description: "Escoge el día y horario que mejor se acomode a tu agenda.",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Confirmación vía WhatsApp",
    description: "Recibe la confirmación de tu reserva directamente por WhatsApp.",
  },
];

const BookingProcess = () => (
  <section className="bg-secondary/50 py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Cómo <span className="text-primary">Reservar</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tres sencillos pasos para asegurar tu sesión fotográfica.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-1/2 top-10 hidden h-px w-full bg-gradient-to-r from-primary/40 to-transparent md:block" />
            )}
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-card shadow-lg shadow-primary/5">
              <s.icon className="h-8 w-8 text-primary" />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-sans text-xs font-bold text-primary-foreground">
                {s.step}
              </span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BookingProcess;
