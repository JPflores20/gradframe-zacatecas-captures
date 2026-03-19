import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { addons } from "./addon_data";

const container_variants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item_variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export const AddonCards = () => (
  <motion.div variants={container_variants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {addons.map((addon) => (
      <motion.div key={addon.title} variants={item_variants} whileHover={{ y: -8, scale: 1.02 }} className="h-full group cursor-pointer">
        <Card className="h-full border border-border/50 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
          <CardContent className="flex flex-col items-center text-center gap-5 p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
            
            <motion.div className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors duration-300 group-hover:bg-primary group-hover:border-primary z-10" whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
              <addon.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </motion.div>
            
            <div className="z-10">
              <h3 className="font-serif text-2xl font-bold text-foreground">{addon.title}</h3>
              <span className="mt-2 inline-block font-sans text-xl font-bold text-primary">{addon.price}</span>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground z-10">{addon.description}</p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </motion.div>
);
