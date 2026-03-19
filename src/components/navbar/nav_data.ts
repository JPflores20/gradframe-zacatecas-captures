export const nav_links = [
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
