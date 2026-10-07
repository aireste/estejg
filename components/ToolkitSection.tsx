import { getProject } from "@/lib/projects";
import { TOOL_GROUPS, toolkit } from "@/lib/toolkit";

const usedLabel = (key: string) => (key === "site" ? "This site" : getProject(key)?.name ?? key);

export default function ToolkitSection() {
  return (
    <section id="toolkit" className="relative py-24 md:py-32">
      <div className="container-x relative z-10">
        {/* header */}
        <div className="grid md:grid-cols-12 gap-8 mb-12 md:mb-14">
          <div className="md:col-span-7">
            <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[0.95] text-bg">
              Toolkit<span className="amber-text">.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-3">
            <p className="text-[rgba(246,244,238,0.55)] text-base md:text-lg leading-relaxed">
              Only what I&apos;ve shipped with. Hover a tool to see which
              project used it.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(246,244,238,0.08)] border border-[rgba(246,244,238,0.08)]">
          {TOOL_GROUPS.map((g) => (
            <div key={g.id} className="bg-[#101010] p-5 md:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber mb-4">{g.label}</div>
              <ul className="flex flex-wrap gap-1.5">
                {toolkit
                  .filter((t) => t.group === g.id)
                  .map((t) => (
                    <li key={t.name} className="group/tool relative">
                      <span
                        tabIndex={0}
                        className="block text-[13px] px-2.5 py-1.5 border text-bg border-[rgba(246,244,238,0.16)] transition-colors duration-300 cursor-default outline-none group-hover/tool:border-amber focus-visible:border-amber"
                      >
                        {t.name}
                      </span>
                      {/* where it was used */}
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute left-0 bottom-full mb-2 z-20 whitespace-nowrap bg-bg text-fg font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1.5 opacity-0 translate-y-1 transition-[opacity,transform] duration-200 group-hover/tool:opacity-100 group-hover/tool:translate-y-0 group-focus-within/tool:opacity-100 group-focus-within/tool:translate-y-0"
                      >
                        {t.used.map(usedLabel).join(" · ")}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
