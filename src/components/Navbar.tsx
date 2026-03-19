import { useState } from "react";
import { Menu, X } from "lucide-react";
import { check_is_admin_authenticated } from "@/functions/auth";
import { NavbarBrand } from "./navbar/navbar_brand";
import { DesktopMenu } from "./navbar/desktop_menu";
import { MobileMenu } from "./navbar/mobile_menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const is_admin = check_is_admin_authenticated();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavbarBrand />
        <DesktopMenu is_admin={is_admin} />

        <button className="text-foreground lg:hidden ml-auto pl-4" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu open={open} setOpen={setOpen} is_admin={is_admin} />
    </nav>
  );
};

export default Navbar;