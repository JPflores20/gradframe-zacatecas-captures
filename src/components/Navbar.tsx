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
        { label: "Preguntas", href: "/#faq" },
        { label: "Ubicación", href: "/#ubicacion" },
        { label: "Testimonios", href: "/#testimonios" },
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
        
        {/* --- LADO IZQUIERDO: Redes Sociales y Logo --- */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Iconos de Redes Sociales */}
          <div className="flex items-center gap-2.5 sm:gap-3 pr-3 sm:pr-4 border-r border-border/50">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/TU_PAGINA" // Falta actualizar el enlace de Facebook
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#1877F2] hover:scale-110 transition-all duration-300"
              title="Síguenos en Facebook"
            >
              <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/gradframe.mx" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-[#E4405F] hover:scale-110 transition-all duration-300"
              title="Síguenos en Instagram"
            >
              <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@gradframe.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300"
              title="Síguenos en TikTok"
            >
              <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.17-.13-.32-.26-.47-.4-.06 2.39.04 4.79-.01 7.18-.18 3.16-2.24 6.07-5.32 6.97-3.5 1.06-7.47-1.05-8.28-4.65-.57-2.35.14-4.91 1.81-6.7 1.49-1.57 3.76-2.3 5.86-1.9v4.14c-1.39-.3-2.92.11-3.83 1.22-.8.98-1.02 2.35-.54 3.51.6 1.48 2.2 2.35 3.81 2.04 1.59-.22 2.79-1.56 2.93-3.17.02-1.28-.01-2.56-.01-3.83 0-3.39-.01-6.77-.01-10.16z" />
              </svg>
            </a>
          </div>

          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-serif text-2xl font-bold text-foreground drop-shadow-sm">GF</span>
            <span className="hidden font-serif text-lg font-medium text-muted-foreground md:inline">/&nbsp;GradFrame</span>
          </a>
        </div>

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

        <button className="text-foreground lg:hidden ml-auto pl-4" onClick={() => setOpen(!open)}>
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
            className="overflow-hidden border-t bg-background lg:hidden shadow-lg"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {nav_links.map((link) => {
                if (link.isDropdown && link.items) {
                  return (
                    <div key={link.label} className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">{link.label}</span>
                      <div className="flex flex-col gap-3 pl-3 border-l-2 border-primary/20 ml-1">
                        {link.items.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            {...(subItem.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* 1. Botón del Cotizador flotante (Móvil) */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-3 mt-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 justify-center shadow-md">
                    <Calculator className="h-5 w-5" />
                    Cotizador de Paquetes
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] p-0 border-none bg-transparent shadow-none w-[95vw]">
                  <DialogTitle className="sr-only">Cotizador de Paquetes</DialogTitle>
                  <div className="max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-xl bg-background shadow-2xl">
                    <PackageCalculator />
                  </div>
                </DialogContent>
              </Dialog>

              {/* 2. Enlace de Admin (Móvil) - Icono discreto al final */}
              <div className="flex justify-end pt-4 mt-2 border-t border-border/50">
                <a
                  href={is_admin ? "/admin/agenda" : "/admin/login"}
                  onClick={() => setOpen(false)}
                  className={`p-2.5 rounded-full transition-colors ${
                    !is_admin
                      ? "text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted"
                      : "bg-primary/10 text-primary"
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