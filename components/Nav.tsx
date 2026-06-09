"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "About",   href: "#about" },
  { label: "Work",    href: "#work" },
  { label: "Contact", href: "#contact" },
  { label: "GitHub",  href: "https://github.com/aireste", external: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "py-3 backdrop-blur-md bg-[rgba(10,10,10,0.92)] border-b border-[rgba(246,244,238,0.08)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-end">
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-mono text-xs uppercase tracking-[0.14em] transition-colors link-underline text-white/70 hover:text-amber"
              >
                {label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden font-mono text-xs uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container-x flex flex-col gap-8">
          {links.map(({ label, href, external }, i) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="font-display font-bold text-4xl text-[#f6f4ee]/50 hover:text-[#f6f4ee] transition-all duration-200"
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {label}<span className="text-amber">.</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
