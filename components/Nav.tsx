"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-md bg-[rgba(246,244,238,0.78)] border-b border-[rgba(10,10,10,0.08)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-end">

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="font-mono text-xs uppercase tracking-[0.14em] hover:text-amber transition-colors link-underline">About</a>
          <a href="#work" className="font-mono text-xs uppercase tracking-[0.14em] hover:text-amber transition-colors link-underline">Work</a>
          <a href="#contact" className="font-mono text-xs uppercase tracking-[0.14em] hover:text-amber transition-colors link-underline">Contact</a>
          <a href="https://github.com/aireste" target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-[0.14em] hover:text-amber transition-colors link-underline">GitHub</a>
        </div>

        <button className="md:hidden font-mono text-xs uppercase tracking-[0.14em]" aria-label="Menu">
          Menu
        </button>
      </div>
    </nav>
  );
}
