import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿Con cuánta anticipación debo reservar?",
    a: "Recomendamos reservar con al menos 2 semanas de anticipación para asegurar disponibilidad en la fecha y horario de tu preferencia, especialmente en temporada alta de graduaciones.",
  },
  {
    q: "¿Cuáles son las políticas de anticipo?",
    a: "Se requiere un anticipo del 50% al momento de firmar el contrato para apartar tu fecha. El 50% restante se cubre en la primera sesión fotográfica.",
  },
  {
    q: "¿Cuántos familiares pueden asistir a la sesión?",
    a: "Cada sesión admite entre 8 y 10 personas como máximo, incluyendo al graduado. Esto nos permite garantizar la calidad y atención personalizada en cada fotografía.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Preguntas Frecuentes
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-md border bg-card px-6"
            >
              <AccordionTrigger className="text-left font-sans text-sm font-medium text-foreground hover:no-underline sm:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
