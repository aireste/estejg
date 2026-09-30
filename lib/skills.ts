// Mirrors the skills tracker in my Build Journal.
// Levels: New → Understood → Shipped → Could teach it

export const LEVELS = ["New", "Understood", "Shipped", "Could teach it"] as const;
export type Level = (typeof LEVELS)[number];

export type Skill = {
  name: string;
  level: Level;
  story: string; // 2–3 sentences: what happened and what it taught me
  project?: string; // slug in lib/projects.ts
};

export const skills: Skill[] = [
  {
    name: "MCP servers",
    level: "Shipped",
    story:
      "HedgePredict isn't just a website. It's also a server any AI can plug into. I exposed five tools (best plays, Jev's read, a deep recommendation, edge math and price history) so Claude Desktop or Claude Code can ask it questions directly. The big lesson: in MCP, the tool description is the instruction manual, so write it like you're briefing a new hire.",
    project: "hedgepredict",
  },
  {
    name: "One engine, many front doors",
    level: "Shipped",
    story:
      "The website, the Ask chat and the MCP server all call the same functions in one folder. None of them keeps its own copy of the logic, so they can't give different answers. It paid off the day I had to switch AI providers: I changed one file and everything followed.",
    project: "hedgepredict",
  },
  {
    name: "Swapping AI providers behind one function",
    level: "Shipped",
    story:
      "Jev went dark in production when Vercel's AI Gateway free tier stopped including it. Instead of paying the middleman, I called TypeSafe directly by rewriting a single file. The website, chat and MCP server all came back at once, answering in about 0.3 seconds.",
    project: "hedgepredict",
  },
  {
    name: "Framing questions for a model",
    level: "Shipped",
    story:
      "Jev said SKIP on 18 out of 18 markets, which looked like a broken model. It wasn't. I'd asked 'is this outcome the favorite?' when the real question was 'which side is underpriced?'. Reframing it as one choice over the sides, with the WAGER / LEAN / SKIP rule in my own code, brought the board to life.",
    project: "hedgepredict",
  },
  {
    name: "Tool use + agentic chat",
    level: "Shipped",
    story:
      "The Ask chat isn't limited to the markets on the dashboard. It has tools to search every tradable market on Polymarket and pull Jev's verdict on whatever it finds, so 'any good bitcoin plays?' actually works. The search also returns closed markets, so filtering down to tradable ones was the unglamorous part that made it trustworthy.",
    project: "hedgepredict",
  },
  {
    name: "Cost-aware limits + model routing",
    level: "Shipped",
    story:
      "I measured what every AI feature costs per click. A Jev read is about 570 tokens; a web-grounded deep read runs 15 to 25 cents. So limits follow cost: 3 deep reads per visitor per day, generous limits on the cheap stuff, and Opus only where it earns it while Sonnet handles chat and explainers.",
    project: "hedgepredict",
  },
  {
    name: "Model upgrades",
    level: "Shipped",
    story:
      "Upgrading to newer Claude models passed every technical check and still made one feature worse. The new model fired several web searches at once, hit my cap before results came back, and quietly answered with no news. I only caught it by reading the actual output, so now every upgrade ends with reading real answers.",
    project: "hedgepredict",
  },
  {
    name: "Giving Claude tools to operate my workflow",
    level: "Shipped",
    story:
      "Claude can't click a Kanban board, but it can run a command. A small CLI lets Claude add and move tasks while we work, so my board stays current without me touching it. It's the same idea as MCP on a smaller scale: give the AI a tool, not a screen.",
    project: "mission-control",
  },
  {
    name: "Shared state with two writers",
    level: "Shipped",
    story:
      "The browser and Claude both edit the same tasks file. Left alone, an open browser tab could save an old copy and wipe out a task Claude had just added. A shared store with a file lock and atomic writes, plus sending small moves instead of the whole board, fixed it.",
    project: "mission-control",
  },
  {
    name: "Motion that means something",
    level: "Shipped",
    story:
      "HedgePredict's prices roll like an odometer, rows flash and Jev visibly sweeps the board, but only when data actually changes. Updates happen in place without reshuffling, so nothing jumps out from under your mouse. Motion that signals a real change feels alive; motion for its own sake feels like noise.",
    project: "hedgepredict",
  },
  {
    name: "Design vocabulary as AI context",
    level: "Understood",
    story:
      "'Make it look good' gets you the average of the internet. I keep a reference library that turns sites I like into specific terms (monumental editorial, data as texture, dither mono) and hand those to Claude as a brief. Specific words get specific designs.",
    project: "taste-vault",
  },
  {
    name: "Prototype before building",
    level: "Understood",
    story:
      "Before rebuilding HedgePredict's layout, I had two clickable mockups made on real market data. They took a fraction of the build time and showed that one desktop layout didn't work before any real code existed. I picked the best of each, one for desktop and one for the phone, then built it.",
    project: "hedgepredict",
  },
  {
    name: "Env vars: local vs hosted",
    level: "Understood",
    story:
      "Jev worked on the live site but not on preview links. The API key was scoped to Production only, and Vercel treats branch deploys as Preview. Keys on your laptop never leave it, and every hosted environment needs its own copy with matching scope.",
    project: "hedgepredict",
  },
  {
    name: "Selling the outcome, not the process",
    level: "Shipped",
    story:
      "SPCTR's first site explained cold outreach, sequences and BDR work. Buyers don't care. I rewrote it to lead with the result: meetings with buyers who need what you sell. The rule I use now: sell the six-pack, not the workout.",
    project: "spctr",
  },
  {
    name: "Pricing that proves the product",
    level: "Understood",
    story:
      "Most agencies bill a retainer for activity whether it works or not. SPCTR charges per booked meeting, so I only get paid when it works. That one structural choice forces everything downstream: narrow lists, relevant copy and honest reporting.",
    project: "spctr",
  },
  {
    name: "Vetting third-party AI plugins",
    level: "New",
    story:
      "Before installing a third-party Claude skill, I read what was inside it: docs only, no scripts. Anything you install into an AI agent can act on your machine, so it gets the same scrutiny as any other dependency.",
  },
];
