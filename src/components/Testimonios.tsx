import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const testimonial_images = [
  "/T1.avif",
  "/T2.avif",
  "/T3.avif",
  "/T4.avif",
  "/T5.avif",
  "/T6.avif",
  "/T7.avif",
];

const Testimonios = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 30
  });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(scrollNext, 4000);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi, scrollNext]);

  return (
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
          <div className="overflow-hidden w-full max-w-2xl rounded-2xl shadow-2xl border border-border/50 bg-background/50 backdrop-blur-sm" ref={emblaRef}>
            <div className="flex">
              {testimonial_images.map((src, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 flex justify-center items-center p-4">
                  <img 
                    src={src} 
                    alt={`Testimonio ${index + 1}`} 
                    className="w-full h-auto max-h-[450px] object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonios;
