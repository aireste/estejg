// Tools and platforms I've actually shipped with, and where.
// Project keys are slugs from lib/projects.ts, plus "site" for this portfolio.

export type ToolGroup = "AI" | "Build" | "Ship" | "Data";

export type Tool = {
  name: string;
  group: ToolGroup;
  used: string[];
};

export const TOOL_GROUPS: { id: ToolGroup; label: string }[] = [
  { id: "AI", label: "AI" },
  { id: "Build", label: "Build" },
  { id: "Ship", label: "Ship" },
  { id: "Data", label: "Data + APIs" },
];

export const toolkit: Tool[] = [
  // AI
  { name: "Claude API (Opus + Sonnet)", group: "AI", used: ["hedgepredict"] },
  { name: "Claude Code", group: "AI", used: ["spctr", "hedgepredict", "mission-control", "taste-vault", "site"] },
  { name: "MCP servers", group: "AI", used: ["hedgepredict"] },
  { name: "Tool use", group: "AI", used: ["hedgepredict"] },
  { name: "Structured outputs", group: "AI", used: ["hedgepredict"] },
  { name: "Claude web search", group: "AI", used: ["hedgepredict"] },
  { name: "TypeSafe (Jev)", group: "AI", used: ["hedgepredict"] },
  { name: "Vercel AI SDK", group: "AI", used: ["hedgepredict"] },

  // Build
  { name: "Next.js", group: "Build", used: ["spctr", "hedgepredict", "site"] },
  { name: "React", group: "Build", used: ["spctr", "hedgepredict", "site"] },
  { name: "TypeScript", group: "Build", used: ["spctr", "hedgepredict", "site"] },
  { name: "Tailwind CSS", group: "Build", used: ["spctr", "hedgepredict", "site"] },
  { name: "Three.js + WebGL shaders", group: "Build", used: ["spctr", "site"] },
  { name: "Framer Motion", group: "Build", used: ["site"] },
  { name: "Python", group: "Build", used: ["mission-control", "taste-vault"] },
  { name: "Vanilla JS", group: "Build", used: ["mission-control", "taste-vault"] },

  // Ship
  { name: "Vercel", group: "Ship", used: ["spctr", "hedgepredict", "site"] },
  { name: "Git + GitHub", group: "Ship", used: ["spctr", "hedgepredict", "mission-control", "taste-vault", "site"] },
  { name: "Env vars + secrets", group: "Ship", used: ["hedgepredict"] },
  { name: "Custom domains + DNS", group: "Ship", used: ["spctr", "site"] },
  { name: "Rate limiting", group: "Ship", used: ["hedgepredict"] },

  // Data + APIs
  { name: "Polymarket APIs", group: "Data", used: ["hedgepredict"] },
  { name: "Zod validation", group: "Data", used: ["hedgepredict"] },
  { name: "Formspree", group: "Data", used: ["spctr"] },
  { name: "JSON file stores", group: "Data", used: ["mission-control", "taste-vault"] },
];
