import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "¿CON CUÁNTO TIEMPO DE ANTICIPACIÓN DEBEMOS RESERVAR?",
    a: "Te recomendamos reservar con la mayor anticipación posible para asegurar disponibilidad de fechas y una mejor organización para tu grupo.\n\nSi lo necesitas, también es posible agendar hasta un mes antes, aunque en ese caso puede haber menos fechas disponibles.",
  },
  {
    q: "¿CUÁNTO ES EL ANTICIPO?",
    a: "Para confirmar tu reserva, se solicita un anticipo del 50% al momento de firmar el contrato.\n\nEl 50% restante se cubre el día de tu primera sesión fotográfica.",
  },
  {
    q: "¿CUÁNTOS FAMILIARES PUEDO LLEVAR A LA SESIÓN FAMILIAR?",
    a: "Cada graduado puede llevar entre 8 y 10 familiares como máximo a su sesión.\n\nEste límite nos permite garantizar una experiencia cómoda, organizada y con fotos de la mejor calidad para todos.",
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
              <AccordionContent className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
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
