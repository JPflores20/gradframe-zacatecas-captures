import { useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { session_types } from "./package_data";

const fmt = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export const PackageCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Approximated width of a card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full group">
      {/* Botón Izquierda */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-[45%] -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-primary/20 shadow-lg backdrop-blur-md text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Anterior paquete"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Contenedor tipo Carrete (Scroll Horizontal) */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-12 pt-4 snap-x snap-mandatory gap-6 px-4 md:px-12 items-center justify-center scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {session_types.map((item, i) => {
          const isCompleta = item.label === "Paquete Base";
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 100 }}
            whileHover={{ y: -15, scale: isCompleta ? 1.08 : 1.01 }}
            className={`snap-center shrink-0 w-[280px] sm:w-[320px] rounded-3xl border flex flex-col cursor-pointer transition-all duration-300 overflow-hidden shadow-sm ${
              isCompleta
                ? "border-primary/80 bg-background shadow-2xl shadow-primary/30 scale-105 z-20 border-2 my-4 relative group"
                : "border-border/50 bg-background/40 scale-95 opacity-70 hover:opacity-100 hover:scale-[0.98] hover:bg-background/80 hover:shadow-xl hover:border-primary/30 z-10 group/card"
            }`}
          >
            {/* Cabecera de la tarjeta */}
            <div className={`p-8 border-b border-border/50 ${item.badge ? 'bg-gradient-to-b from-primary/15 to-transparent' : 'bg-gradient-to-b from-muted/30 to-transparent'} flex flex-col items-center text-center relative overflow-hidden`}>
              {/* Badge si aplica */}
              {item.badge && (
                <div className="absolute top-0 inset-x-0 mx-auto w-full bg-primary text-primary-foreground text-sm font-bold px-4 py-2 text-center uppercase tracking-widest shadow-md z-20">
                  {item.badge}
                </div>
              )}
              {/* Brillo sutil de fondo en la tarjeta */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl transition-colors duration-500 ${isCompleta ? 'group-hover:bg-primary/20' : 'group-hover/card:bg-primary/20'}`} />
              
              <motion.div 
                className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 relative z-10 transition-colors duration-300 ${isCompleta ? 'bg-primary text-primary-foreground mt-8 group-hover:bg-primary/90' : 'bg-primary/10 group-hover/card:bg-primary group-hover/card:text-primary-foreground'}`}
                whileHover={{ rotate: 10 }}
              >
                <Camera className={`h-7 w-7 transition-colors ${isCompleta ? 'text-primary-foreground' : 'text-primary group-hover/card:text-white'}`} />
              </motion.div>
              <h3 className={`font-serif text-2xl font-bold tracking-wide relative z-10 ${isCompleta ? 'text-primary text-3xl' : 'text-foreground'}`}>
                {item.label}
              </h3>
              <div className="mt-4 relative z-10">
                <span className={`font-serif font-bold text-foreground ${isCompleta ? 'text-5xl' : 'text-4xl'}`}>
                  {fmt(item.price)}
                </span>
                <span className="text-xs text-muted-foreground block mt-1 uppercase tracking-wider font-semibold">
                  por persona
                </span>
              </div>
            </div>

            {/* Lista de características */}
            <div className={`p-8 flex-grow ${isCompleta ? 'bg-primary/5' : 'bg-transparent'}`}>
              <ul className="space-y-4">
                {item.features.map((feature, idx) => {
                  const isHighlight = isCompleta && (feature.includes("INCLUYE") || feature.includes("ENTREGA") || feature.includes("Cotización grupal"));
                  return (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex items-start"
                    >
                      <div className={`mt-0.5 mr-3 rounded-full p-1 shrink-0 transition-colors duration-300 ${isCompleta ? 'bg-primary/20 group-hover:bg-primary/30' : 'bg-green-100 group-hover/card:bg-primary/20'}`}>
                        <Check className={`h-3 w-3 ${isCompleta ? 'text-primary' : 'text-green-600'}`} />
                      </div>
                      <span className={`text-sm leading-tight transition-colors duration-300 ${isHighlight ? 'text-foreground font-bold' : 'text-muted-foreground font-medium'} ${!isCompleta ? 'group-hover/card:text-foreground' : ''}`}>
                        {feature}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
          );
        })}
      </div>

      {/* Botón Derecha */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-[45%] -translate-y-1/2 z-30 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-primary/20 shadow-lg backdrop-blur-md text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Siguiente paquete"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* CSS para ocultar la barra de scroll nativa */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
