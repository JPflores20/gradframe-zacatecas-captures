import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";

// Variantes para el efecto cascada de los textos
const container_variants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const item_variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Variantes para el efecto de máquina de escribir
const typing_container_variants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Velocidad de escritura (menor número = más rápido)
    },
  },
};

const typing_letter_variants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

// Texto a animar
const welcome_text = "WELCOME TO THE GRADFRAME EXPERIENCE";

const Hero = () => (
  <section
    id="home"
    className="relative flex flex-col items-center overflow-hidden pt-24 pb-16"
  >
    {/* Fondo con gradiente base */}
    <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />

    {/* Efectos de luz flotantes en el fondo (Blobs) */}
    <motion.div 
      animate={{ 
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[100px] pointer-events-none"
    />
    <motion.div 
      animate={{ 
        y: [0, 40, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"
    />

    <div className="relative z-10 mx-auto max-w-4xl px-4 pt-8 text-center sm:pt-16">
      <motion.div
        variants={container_variants}
        initial="hidden"
        animate="show"
      >
        <motion.span 
          variants={item_variants}
          className="mb-4 inline-block border border-border/50 bg-background/50 backdrop-blur-sm px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm"
        >
          Zacatecas, México
        </motion.span>
        
        {/* El logo ahora aparece arriba del texto de bienvenida */}
        <motion.img
          variants={item_variants}
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
          src="/GF_logo.avif"
          alt="GradFrame Logo"
          className="mx-auto mt-6 h-20 w-auto object-contain sm:h-24 md:h-28 drop-shadow-xl cursor-pointer"
        />

        {/* Título con efecto de máquina de escribir movido debajo del logo */}
        <motion.h1 
          variants={typing_container_variants}
          initial="hidden"
          animate="show"
          className="mt-8 font-serif text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm flex flex-wrap justify-center items-center"
        >
          {welcome_text.split("").map((letter, index) => (
            <motion.span 
              key={index} 
              variants={typing_letter_variants}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter} {/* Manejar espacios */}
            </motion.span>
          ))}
          {/* Cursor parpadeante */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="inline-block ml-1 h-[1em] w-[2px] bg-foreground"
          />
        </motion.h1>
        
        <motion.p 
          variants={item_variants}
          className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground sm:text-xl"
        >
          Capturando la culminación de tu esfuerzo.
        </motion.p>
        
        <motion.div variants={item_variants} className="mt-10">
          <Button
            asChild
            size="lg"
            className="px-10 py-6 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
          >
            <a href="#paquetes">Ver Paquetes</a>
          </Button>
        </motion.div>
      </motion.div>
    </div>

    {/* Imagen principal con efecto parallax suave y flotación */}
    <motion.div
      className="relative z-10 mx-auto mt-16 w-full max-w-5xl px-4"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/10 group cursor-pointer"
      >
        <motion.img
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
          src="/Graduados1.avif"
          alt="Graduados celebrando"
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;