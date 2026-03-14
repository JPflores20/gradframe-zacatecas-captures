import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5215646831101?text=Hola%2C%20quiero%20más%20información";

const Footer = () => (
  <>
    <footer className="border-t bg-neutral-900 py-12">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-serif text-lg font-bold text-white">GF</span>
        <span className="ml-1 font-serif text-sm text-neutral-400">/ GradFrame</span>
        <div className="mt-4 flex justify-center gap-6">
          {[
            { name: "Instagram", href: "https://www.instagram.com/gradframe.mx" },
            { name: "TikTok", href: "https://www.tiktok.com/@gradframe.mx" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href !== "#" ? "_blank" : undefined}
              rel={social.href !== "#" ? "noopener noreferrer" : undefined}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {social.name}
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-neutral-500">
          © 2026 GradFrame. Todos los derechos reservados.
        </p>
      </div>
    </footer>

    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg transition-transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-whatsapp-foreground" />
    </a>
  </>
);

export default Footer;
