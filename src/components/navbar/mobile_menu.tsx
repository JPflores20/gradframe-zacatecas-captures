import { Calculator, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PackageCalculator } from "@/components/package_calculator";
import { nav_links } from "./nav_data";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  is_admin: boolean;
}

export const MobileMenu = ({ open, setOpen, is_admin }: Props) => (
  <AnimatePresence>
    {open && (
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t bg-background lg:hidden shadow-lg">
        <div className="flex flex-col gap-4 px-6 py-4">
          {nav_links.map((link) => {
            if (link.isDropdown && link.items) {
              return (
                <div key={link.label} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">{link.label}</span>
                  <div className="flex flex-col gap-3 pl-3 border-l-2 border-primary/20 ml-1">
                    {link.items.map((subItem) => (
                      <a key={subItem.label} href={subItem.href} {...(subItem.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <a key={link.label} href={link.href} {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                {link.label}
              </a>
            );
          })}

          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 mt-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 justify-center shadow-md">
                <Calculator className="h-5 w-5" /> Cotizador de Paquetes
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent shadow-none w-[95vw]">
              <DialogTitle className="sr-only">Cotizador de Paquetes</DialogTitle>
              <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-xl bg-background shadow-2xl">
                <PackageCalculator />
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex justify-end pt-4 mt-2 border-t border-border/50">
            <a href={is_admin ? "/admin/agenda" : "/admin/login"} onClick={() => setOpen(false)} className={`p-2.5 rounded-full transition-colors ${!is_admin ? "text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted" : "bg-primary/10 text-primary"}`} aria-label="Administración">
              <Settings className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
