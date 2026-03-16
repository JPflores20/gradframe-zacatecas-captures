import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { check_is_admin_authenticated } from "@/functions/auth";

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

        <div className="hidden items-center gap-8 md:flex">
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
        </div>

        <button className="text-foreground md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t bg-background md:hidden"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
