export const NavbarBrand = () => (
  <div className="flex items-center gap-3 sm:gap-4">
    <div className="flex items-center gap-2.5 sm:gap-3 pr-3 sm:pr-4 border-r border-border/50">
      <a href="https://www.facebook.com/share/1LFTCjk2yd/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1877F2] hover:scale-110 transition-all duration-300" title="Síguenos en Facebook">
        <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
      </a>
      <a href="https://www.instagram.com/gradframe.mx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E4405F] hover:scale-110 transition-all duration-300" title="Síguenos en Instagram">
        <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
      <a href="https://www.tiktok.com/@gradframe.mx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground hover:scale-110 transition-all duration-300" title="Síguenos en TikTok">
        <svg className="h-[18px] w-[18px] sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.17-.13-.32-.26-.47-.4-.06 2.39.04 4.79-.01 7.18-.18 3.16-2.24 6.07-5.32 6.97-3.5 1.06-7.47-1.05-8.28-4.65-.57-2.35.14-4.91 1.81-6.7 1.49-1.57 3.76-2.3 5.86-1.9v4.14c-1.39-.3-2.92.11-3.83 1.22-.8.98-1.02 2.35-.54 3.51.6 1.48 2.2 2.35 3.81 2.04 1.59-.22 2.79-1.56 2.93-3.17.02-1.28-.01-2.56-.01-3.83 0-3.39-.01-6.77-.01-10.16z" /></svg>
      </a>
    </div>
    <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <span className="font-serif text-2xl font-bold text-foreground drop-shadow-sm">GF</span>
      <span className="hidden font-serif text-lg font-medium text-muted-foreground md:inline">/&nbsp;GradFrame</span>
    </a>
  </div>
);
