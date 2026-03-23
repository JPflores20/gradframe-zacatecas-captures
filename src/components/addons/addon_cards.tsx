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
  <div className="mt-16 flex flex-wrap justify-center gap-6">
    {addons.map((addon) => (
      <div key={addon.title} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] max-w-[380px] h-full group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
        <Card className="h-full border border-border/50 bg-background/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
          <CardContent className="flex flex-col items-center text-center gap-5 p-8 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors duration-300 group-hover:bg-primary group-hover:border-primary z-10">
              <addon.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            
            <div className="z-10">
              <h3 className="font-serif text-2xl font-bold text-foreground">{addon.title}</h3>
              <span className="mt-2 inline-block font-sans text-xl font-bold text-primary">{addon.price}</span>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground z-10">{addon.description}</p>
          </CardContent>
        </Card>
      </div>
    ))}
  </div>
);
