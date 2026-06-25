"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
  </svg>
);


const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type SocialLink = {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
};

type ProfileCardProps = {
  avatarUrl: string;
  name: string;
  title?: string;
  bio: string;
  socialLinks?: SocialLink[];
};

export function ProfileCard({
  avatarUrl,
  name,
  title,
  bio,
  socialLinks = [],
}: ProfileCardProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-sm">
      <div
        className="relative flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 ease-out backdrop-blur-xl bg-[rgba(246,244,238,0.04)] border-[rgba(246,244,238,0.08)]"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
      >
        <div className="w-64 h-64 mb-4 rounded-full p-1 border-2 border-[rgba(246,244,238,0.15)] overflow-hidden">
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="w-full h-full rounded-full object-cover object-[80%_15%] scale-125"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = `https://placehold.co/96x96/0a0a0a/f6f4ee?text=${name.charAt(0)}`;
            }}
          />
        </div>

        {title && <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-amber">{title}</p>}
        <p className="mt-4 text-center text-sm leading-relaxed text-[rgba(246,244,238,0.55)]">{bio}</p>

        <div className="w-1/2 h-px my-6 rounded-full bg-[rgba(246,244,238,0.1)]" />

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((item) => (
            <SocialButton
              key={item.id}
              item={item}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
            />
          ))}
        </div>

      </div>

      <div className="absolute inset-0 rounded-3xl -z-10 blur-2xl opacity-20 bg-gradient-to-br from-amber/60 to-[#f59e0b]/40 transition-all duration-500 ease-out" />
    </div>
  );
}

function SocialButton({
  item,
  hoveredItem,
  setHoveredItem,
}: {
  item: SocialLink;
  hoveredItem: string | null;
  setHoveredItem: (id: string | null) => void;
}) {
  return (
    <div className="relative">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group bg-[rgba(246,244,238,0.06)] hover:bg-[rgba(246,244,238,0.12)]"
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        aria-label={item.label}
      >
        <span className="transition-colors duration-200 text-[rgba(246,244,238,0.5)] group-hover:text-[#f6f4ee]">
          <item.icon size={20} />
        </span>
      </a>
      <Tooltip item={item} hoveredItem={hoveredItem} />
    </div>
  );
}

function Tooltip({ item, hoveredItem }: { item: SocialLink; hoveredItem: string | null }) {
  return (
    <div
      role="tooltip"
      className={`absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg border text-xs font-mono whitespace-nowrap pointer-events-none transition-all duration-300 ease-out bg-[#0a0a0a] text-[#f6f4ee] border-[rgba(246,244,238,0.1)] ${
        hoveredItem === item.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
    >
      {item.label}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0a0a0a] border-b border-r border-[rgba(246,244,238,0.1)]" />
    </div>
  );
}

export const ESTEBAN_LINKS: SocialLink[] = [
  { id: "github",   icon: GitHubIcon,   label: "GitHub",   href: "https://github.com/aireste" },
  { id: "linkedin", icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/estebanguerra" },
  { id: "email",    icon: Mail,         label: "Email",    href: "mailto:estebanjguerra@gmail.com" },
];
