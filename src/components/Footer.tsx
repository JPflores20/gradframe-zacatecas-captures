import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/524921234567?text=Hola%2C%20quiero%20más%20información";

const Footer = () => (
  <>
    <footer className="border-t border-border/40 bg-secondary/30 py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-serif text-lg font-bold text-primary">GF</span>
        <span className="ml-1 font-serif text-sm text-foreground">/ GradFrame</span>
        <div className="mt-4 flex justify-center gap-6">
          {["Instagram", "Facebook", "TikTok"].map((name) => (
            <a
              key={name}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {name}
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          © 2026 GradFrame. Todos los derechos reservados.
        </p>
      </div>
    </footer>

    {/* Floating WhatsApp button */}
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg shadow-whatsapp/30 transition-transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-whatsapp-foreground" />
    </a>
  </>
);

export default Footer;
