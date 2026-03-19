import { ChevronDown, Calculator, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { PackageCalculator } from "@/components/package_calculator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { nav_links } from "./nav_data";

interface Props {
  is_admin: boolean;
}

export const DesktopMenu = ({ is_admin }: Props) => (
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
                  <a href={subItem.href} {...(subItem.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="w-full cursor-pointer">
                    {subItem.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      return (
        <a key={link.label} href={link.href} {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          {link.label}
        </a>
      );
    })}

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

    <a href={is_admin ? "/admin/agenda" : "/admin/login"} className={`flex items-center justify-center p-2 rounded-full transition-colors ${!is_admin ? "text-muted-foreground/30 hover:text-muted-foreground hover:bg-muted" : "text-primary hover:bg-primary/10"}`} aria-label="Administración">
      <Settings className="h-4 w-4" />
    </a>
  </div>
);
