// Mirrors the skills tracker in my Build Journal.
// Levels: New → Understood → Shipped → Could teach it

export const LEVELS = ["New", "Understood", "Shipped", "Could teach it"] as const;
export type Level = (typeof LEVELS)[number];

export type Skill = {
  name: string;
  level: Level;
  where: string;
  project?: string; // slug in lib/projects.ts
};

export const skills: Skill[] = [
  {
    name: "MCP servers",
    level: "Shipped",
    where: "Five tools that let any AI use HedgePredict's engine, live on Vercel",
    project: "hedgepredict",
  },
  {
    name: "One engine, many front doors",
    level: "Shipped",
    where: "Web UI, chat and MCP all call the same lib/ functions",
    project: "hedgepredict",
  },
  {
    name: "Swapping AI providers behind one function",
    level: "Shipped",
    where: "Moved Jev from Vercel's AI Gateway to TypeSafe by editing one file",
    project: "hedgepredict",
  },
  {
    name: "Framing questions for a model",
    level: "Shipped",
    where: "Reframed Jev from 'is it the favorite?' to 'which side is underpriced?'",
    project: "hedgepredict",
  },
  {
    name: "Tool use + agentic chat",
    level: "Shipped",
    where: "Ask chat searches every market and pulls Jev's verdict on its own",
    project: "hedgepredict",
  },
  {
    name: "Cost-aware limits + model routing",
    level: "Shipped",
    where: "Opus only for deep reads, Sonnet for the light stuff, limits set by cost",
    project: "hedgepredict",
  },
  {
    name: "Model upgrades",
    level: "Shipped",
    where: "Moved to new Claude models by reading migration notes, then the real output",
    project: "hedgepredict",
  },
  {
    name: "Giving Claude tools to operate my workflow",
    level: "Shipped",
    where: "Claude manages my Kanban board through a small CLI",
    project: "mission-control",
  },
  {
    name: "Shared state with two writers",
    level: "Shipped",
    where: "Browser and Claude edit the same tasks.json without clobbering",
    project: "mission-control",
  },
  {
    name: "Motion that means something",
    level: "Shipped",
    where: "Prices roll and rows flash only when data actually changes",
    project: "hedgepredict",
  },
  {
    name: "Design vocabulary as AI context",
    level: "Understood",
    where: "Turning references into briefs Claude can build from",
    project: "taste-vault",
  },
  {
    name: "Prototype before building",
    level: "Understood",
    where: "Clickable mockups on real data before touching the app",
    project: "hedgepredict",
  },
  {
    name: "Env vars: local vs hosted",
    level: "Understood",
    where: "Found a Preview-vs-Production key scope bug in prod",
    project: "hedgepredict",
  },
  {
    name: "Vetting third-party AI plugins",
    level: "New",
    where: "Reviewed the TypeSafe skill's contents before installing it",
  },
];
