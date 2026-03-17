import { useState } from "react";
import { Menu, X, Calculator, ChevronDown, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { check_is_admin_authenticated } from "@/functions/auth";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PackageCalculator } from "@/components/package_calculator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const is_admin = check_is_admin_authenticated();

  // Enlaces públicos separados del enlace de admin
  const nav_links = [
    {
      label: "Home",
      isDropdown: true,
      items: [
        { label: "Inicio", href: "/" },
        { label: "Testimonios", href: "/#testimonios" },
        { label: "Preguntas", href: "/#faq" },
        { label: "Ubicación", href: "/#ubicacion" },
      ],
    },
    {
      label: "Productos",
      isDropdown: true,
      items: [
        { label: "Cuadros", href: "/cuadros", newTab: true },
        { label: "Estolas", href: "/estolas", newTab: true },
      ],
    },
    { label: "Agenda Pública", href: "/agenda", newTab: false },
    { label: "Registro Alumnos", href: "/ingresar-codigo", newTab: false },
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
          {nav_links.map((link) => {
            if (link.isDropdown && link.items) {
              return (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none">
                    {link.label} <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    {link.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.label} asChild>
                        <a
                          href={subItem.href}
                          {...(subItem.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="w-full cursor-pointer"
                        >
                          {subItem.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            );
          })}

          {/* 1. Botón del Cotizador flotante (Escritorio) */}
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

          {/* 2. Enlace de Admin (Escritorio) - Ahora es un icono discreto */}
          <a
            href={is_admin ? "/admin/agenda" : "/admin/login"}
            className={`flex items-center justify-center p-2 rounded-full transition-colors ${
              !is_admin
                ? "text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted" // Muy discreto si no está logueado
                : "text-primary hover:bg-primary/10" // Más visible si ya es admin
            }`}
            aria-label="Administración"
            title=""
          >
            <Settings className="h-4 w-4" />
          </a>
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
              {nav_links.map((link) => {
                if (link.isDropdown && link.items) {
                  return (
                    <div key={link.label} className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">{link.label}</span>
                      <div className="flex flex-col gap-3 pl-3 border-l-2 ml-1">
                        {link.items.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            {...(subItem.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* 1. Botón del Cotizador flotante (Móvil) */}
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

              {/* 2. Enlace de Admin (Móvil) - Icono discreto al final */}
              <div className="flex justify-end pt-2 mt-2 border-t">
                <a
                  href={is_admin ? "/admin/agenda" : "/admin/login"}
                  onClick={() => setOpen(false)}
                  className={`p-2 rounded-full transition-colors ${
                    !is_admin
                      ? "text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted"
                      : "text-primary hover:bg-primary/10"
                  }`}
                  aria-label="Administración"
                >
                  <Settings className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;