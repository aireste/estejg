"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface MenuItem {
  label: string;
  href: string;
}

function MenuButton({
  label,
  href,
  isOpen,
  index,
  onClose,
}: {
  label: string;
  href: string;
  isOpen: boolean;
  index: number;
  onClose: () => void;
}) {
  const handleClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="text-[#f6f4ee] text-[22px] uppercase leading-none font-display font-bold tracking-tight transition-all duration-200 hover:scale-110 hover:text-white"
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{
        duration: 0.4,
        delay: isOpen ? 0.4 + 0.08 * index : 0,
        ease,
      }}
    >
      {label}
    </motion.button>
  );
}

const defaultItems: MenuItem[] = [
  { label: "About",   href: "#about" },
  { label: "Work",    href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function FloatingMenu({ items = defaultItems }: { items?: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-5 right-6 z-[100]"
      style={{ pointerEvents: "auto" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <motion.div
        className="relative overflow-hidden flex flex-col"
        onClick={() => { if (!isOpen) setIsOpen(true); }}
        style={{ cursor: isOpen ? "default" : "pointer" }}
        animate={{
          width: isOpen ? 240 : 130,
          height: isOpen ? 240 : 44,
          borderRadius: isOpen ? 32 : 72,
          scale: 1,
        }}
        whileHover={isOpen ? undefined : { scale: 1.05 }}
        transition={{
          duration: 0.8,
          ease,
          height: { duration: isOpen ? 0.8 : 0.15 },
          scale: { duration: 0.25, ease },
        }}
      >
        {/* Amber background */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: "#d97706",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#b45309",
            borderRadius: "inherit",
          }}
        />

        {/* Dark circle expanding from bottom */}
        <motion.div
          className="absolute left-1/2 bg-[#0a0a0a]"
          style={{ width: "200%", height: "200%", borderRadius: "50%", x: "-50%" }}
          animate={{ bottom: isOpen ? "-20%" : "-200%" }}
          transition={{ duration: 0.8, ease, delay: isOpen ? 0.1 : 0 }}
        />

        {/* Menu items */}
        <div
          className="relative z-10 flex flex-col gap-6 items-center justify-center"
          style={{
            pointerEvents: isOpen ? "auto" : "none",
            opacity: isOpen ? 1 : 0,
            flex: isOpen ? 1 : 0,
            overflow: "hidden",
          }}
        >
          {items.map((item, idx) => (
            <MenuButton
              key={item.label}
              label={item.label}
              href={item.href}
              isOpen={isOpen}
              index={idx}
              onClose={() => setIsOpen(false)}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          className="relative z-10 flex items-center justify-between w-full shrink-0 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            paddingLeft: isOpen ? 24 : 18,
            paddingRight: isOpen ? 24 : 18,
            paddingBottom: isOpen ? 20 : 0,
            height: 44,
          }}
          transition={{ duration: 0.8, ease }}
          style={{ alignItems: "center" }}
        >
          <motion.span
            className="font-display font-bold text-[13px] uppercase tracking-tight leading-none"
            animate={{ color: isOpen ? "#f6f4ee" : "#0a0a0a" }}
            transition={{ duration: 0.3, ease }}
          >
            Menu
          </motion.span>

          <div className="relative w-[22px] h-[22px] flex items-center justify-center">
            <motion.span
              className="absolute block w-[16px] h-[1.5px] rounded-full"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -3,
                backgroundColor: isOpen ? "#f6f4ee" : "#0a0a0a",
              }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.span
              className="absolute block w-[16px] h-[1.5px] rounded-full"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 3,
                backgroundColor: isOpen ? "#f6f4ee" : "#0a0a0a",
              }}
              transition={{ duration: 0.4, ease }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
