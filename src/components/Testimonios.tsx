import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonios = [
  {
    name: "María García",
    career: "Ing. en Sistemas — UAZ",
    text: "Fue una experiencia increíble. Las fotos quedaron hermosas y el equipo fue muy profesional. ¡Mi familia y yo estamos encantados con el resultado!",
    stars: 5,
  },
  {
    name: "Carlos Hernández",
    career: "Lic. en Derecho — UAZ",
    text: "Desde la primera sesión nos sentimos muy cómodos. La calidad de las fotos y los cuadros superaron nuestras expectativas. Totalmente recomendado.",
    stars: 5,
  },
  {
    name: "Ana López",
    career: "Medicina — UAZ",
    text: "El mejor regalo que pude darle a mi familia. Las estolas personalizadas y los cuadros son un recuerdo que vamos a atesorar por siempre.",
    stars: 5,
  },
  {
    name: "Roberto Martínez",
    career: "Arquitectura — UAZ",
    text: "Muy puntual, organizado y con un trato excelente. Las fotos capturaron perfectamente la emoción de ese día tan especial.",
    stars: 5,
  },
  {
    name: "Laura Sánchez",
    career: "Contaduría — UAZ",
    text: "Me encantó el proceso, desde la reserva por WhatsApp hasta la entrega. Todo fue rápido, bonito y sin complicaciones. ¡100% recomendable!",
    stars: 5,
  },
  {
    name: "Diego Ramírez",
    career: "Ing. Civil — UAZ",
    text: "Las locaciones en Zacatecas le dieron un toque especial a las fotos. El fotógrafo supo capturar los mejores momentos con nuestra familia.",
    stars: 5,
  },
];

const Testimonios = () => (
  <section id="testimonios" className="border-y bg-secondary/50 py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Lo que dicen nuestros graduados
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Experiencias reales de quienes vivieron la experiencia GradFrame.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonios.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border bg-background transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-4 p-6">
                <Quote className="h-6 w-6 text-muted-foreground/40" />
                <p className="text-sm leading-relaxed text-muted-foreground italic">
                  "{t.text}"
                </p>
                <div className="mt-auto flex items-center gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.career}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonios;
