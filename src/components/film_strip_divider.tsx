import { motion } from "framer-motion";

interface FilmStripSeparatorProps {
  rotation?: string;
  direction?: 1 | -1;
  className?: string;
}

const FilmStripSeparator = ({ 
  rotation = "-2deg", 
  direction = 1,
  className = ""
}: FilmStripSeparatorProps) => {
  // Generamos un arreglo grande para asegurar que cubra pantallas ultra anchas
  const holes = Array.from({ length: 50 });
  const frames = Array.from({ length: 40 });

  return (
    // Contenedor principal para observar la intersección de forma confiable sin importar la animación hija
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`relative w-[110vw] -ml-[5vw] h-28 sm:h-32 my-8 sm:my-16 pointer-events-none z-10 ${className}`}
    >
      <motion.div 
        variants={{
          hidden: { 
            opacity: 0, 
            scaleX: 0,
            rotate: direction === 1 ? "-10deg" : "10deg"
          },
          visible: { 
            opacity: 1, 
            scaleX: 1,
            rotate: rotation,
            transition: { duration: 1.5, type: "spring", bounce: 0.2 }
          }
        }}
        style={{ transformOrigin: direction === 1 ? "left center" : "right center" }}
        className="absolute inset-0 overflow-hidden flex items-center justify-center"
      >
        {/* Fondo negro de la cinta fotográfica con sombra para destacar y crear profundidad */}
        <div className="absolute inset-0 bg-neutral-950 shadow-2xl border-y border-white/10" />
      
      {/* Perforaciones Superiores */}
      <div className="absolute top-2 sm:top-3 left-0 right-0 flex gap-2 sm:gap-3 px-2">
        {holes.map((_, i) => (
          <div key={`top-${i}`} className="w-5 h-4 sm:w-8 sm:h-5 bg-background rounded-sm shrink-0 shadow-inner opacity-90" />
        ))}
      </div>
      
      {/* Perforaciones Inferiores */}
      <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex gap-2 sm:gap-3 px-2">
        {holes.map((_, i) => (
          <div key={`bottom-${i}`} className="w-5 h-4 sm:w-8 sm:h-5 bg-background rounded-sm shrink-0 shadow-inner opacity-90" />
        ))}
      </div>

      {/* Fotogramas serpenteantes (animación) */}
      <motion.div 
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        className="absolute top-1/2 -translate-y-1/2 flex items-center h-12 sm:h-14 w-[300vw]"
      >
        <div className="flex gap-2 sm:gap-3 w-[150vw]">
          {frames.map((_, i) => (
            <div key={`frame-a-${i}`} className="h-full aspect-[3/2] shrink-0 bg-white/5 border border-white/10 rounded-sm" />
          ))}
        </div>
        <div className="flex gap-2 sm:gap-3 w-[150vw]">
          {frames.map((_, i) => (
            <div key={`frame-b-${i}`} className="h-full aspect-[3/2] shrink-0 bg-white/5 border border-white/10 rounded-sm" />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
  );
};

export default FilmStripSeparator;
