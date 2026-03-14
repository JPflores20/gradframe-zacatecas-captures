import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Location = () => (
  <section id="ubicacion" className="py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Ubicación del Estudio
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Visítanos y conoce nuestro espacio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 grid gap-8 lg:grid-cols-3"
      >
        {/* Info cards */}
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm">
            <div className="rounded-md border bg-secondary p-3">
              <MapPin className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Dirección
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Zacatecas, Zacatecas, México
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm">
            <div className="rounded-md border bg-secondary p-3">
              <Clock className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Horario
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                A acordar directamente con GradFrame
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="relative overflow-hidden rounded-2xl border shadow-md lg:col-span-2 group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3679.142259316282!2d-102.571399724694!3d22.760101279358615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDQ1JzM2LjQiTiAxMDLCsDM0JzA3LjgiVw!5e0!3m2!1ses!2smx!4v1773506226189!5m2!1ses!2smx"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación del estudio GradFrame"
          />
          
          {/* Botón Flotante "Cómo llegar" */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <Button asChild size="lg" className="rounded-full shadow-lg">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Zacatecas,Zacatecas,Mexico"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 h-5 w-5" />
                Cómo llegar
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Location;