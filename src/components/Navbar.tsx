import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { check_is_admin_authenticated } from "@/functions/auth";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PackageCalculator } from "@/components/package_calculator";

const public_nav_links = [
  { label: "Home", href: "/" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "FAQ", href: "/#faq" },
  { label: "Ubicación", href: "/#ubicacion" },
  { label: "Cuadros", href: "/cuadros", newTab: true },
  { label: "Estolas", href: "/estolas", newTab: true },
  { label: "Agenda Pública", href: "/agenda", newTab: false },
  { label: "Registro Alumnos", href: "/ingresar-codigo", newTab: false },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const is_admin = check_is_admin_authenticated();

  const nav_links = [
    ...public_nav_links,
    is_admin
      ? { label: "Admin Agenda", href: "/admin/agenda", newTab: false }
      : { label: "Admin Login", href: "/admin/login", newTab: false, isAdmin: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-foreground">GF</span>
          <span className="hidden font-serif text-lg font-medium text-muted-foreground sm:inline">/&nbsp;GradFrame</span>
        </a>

        {/* --- Menú de Escritorio --- */}
        <div className="hidden items-center gap-8 lg:flex">
          {nav_links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                "isAdmin" in link && link.isAdmin && !is_admin
                  ? "text-muted-foreground/50 hover:text-muted-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Botón del Cotizador flotante (Escritorio) */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
                <Calculator className="h-4 w-4" />
                Cotizador
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent shadow-none">
              <DialogTitle className="sr-only">Cotizador de Paquetes</DialogTitle>
              <PackageCalculator />
            </DialogContent>
          </Dialog>
        </div>

        <button className="text-foreground lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Menú Móvil --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t bg-background lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {nav_links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    "isAdmin" in link && link.isAdmin && !is_admin
                      ? "text-muted-foreground/50 hover:text-muted-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* Botón del Cotizador flotante (Móvil) */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md bg-primary/10 px-4 py-3 mt-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 text-left">
                    <Calculator className="h-5 w-5" />
                    Cotizador de Paquetes
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent shadow-none w-[95vw]">
                  <DialogTitle className="sr-only">Cotizador de Paquetes</DialogTitle>
                  <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-xl">
                    <PackageCalculator />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;