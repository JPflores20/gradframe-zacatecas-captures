import { motion } from "framer-motion";
import { AddonCards } from "./addons/addon_cards";
import { QuoterDialogButton } from "./addons/quoter_button";

const Addons = () => (
  <div id="addons" className="pt-8 pb-12 relative overflow-hidden mt-4">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center"
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Lleva tu recuerdo al siguiente nivel</span>
        <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Personaliza tu Paquete
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-lg">
          Complementa tu experiencia con estos servicios adicionales de primera calidad.
        </p>
      </motion.div>

      <AddonCards />
      <QuoterDialogButton />
    </div>
  </div>
);

export default Addons;