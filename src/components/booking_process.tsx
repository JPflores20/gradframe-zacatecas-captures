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
    description: "Escoge el día y horario que mejor se acomode a tu agenda. Puedes consultar nuestros dias disponibles en la seccion de Agenda pública",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Confirmación vía WhatsApp",
    description: "Recibe la confirmación de tu reserva directamente por WhatsApp.",
  },
];

const BookingProcess = () => (
  <section className="border-y bg-secondary/50 py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Cómo Reservar
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tres sencillos pasos para asegurar tu sesión fotográfica.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border bg-background">
              <s.icon className="h-6 w-6 text-foreground" />
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground font-sans text-[10px] font-bold text-background">
                {s.step}
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BookingProcess;
