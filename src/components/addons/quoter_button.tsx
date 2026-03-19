import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PackageCalculator } from "@/components/package_calculator";

export const QuoterDialogButton = () => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 flex justify-center">
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:-translate-y-1 hover:shadow-primary/40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 px-8 py-2 translate-x-[-150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
          <Calculator className="h-7 w-7" />
          Calcula el Precio de tu Paquete
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 border-none bg-transparent shadow-none w-[95vw]">
        <DialogTitle className="sr-only">Cotizador de Paquetes</DialogTitle>
        <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-background shadow-2xl">
          <PackageCalculator />
        </div>
      </DialogContent>
    </Dialog>
  </motion.div>
);
