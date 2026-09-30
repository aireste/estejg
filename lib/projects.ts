// Single source of truth for every project on the site.
// The homepage grid and /work/[slug] case studies both read from here —
// adding a project means adding one entry, not building a page.

export type Preview =
  | { kind: "iframe"; src: string }
  | { kind: "image"; src: string; alt: string };

export type CaseStudy = {
  problem: { heading: string; body: string[] };
  build: { heading: string; body: string[] };
  architecture: {
    heading: string;
    intro: string;
    flow: { label: string; detail: string }[];
  };
  concepts: { name: string; body: string }[];
  broke: { what: string; lesson: string }[];
  credit?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  status: "Live" | "Local tool";
  role: string;
  stack: string[];
  ai: string[]; // AI concepts shown as tags on the card
  preview: Preview;
  address: string; // shown in the card's browser bar
  links: { label: string; href: string }[];
  visit?: string; // live URL for the card's "Visit site" button; omit for local tools
  caseStudy?: CaseStudy; // undefined = has its own hand-built page (SPCTR)
};

export const projects: Project[] = [
  {
    slug: "spctr",
    name: "SPCTR",
    tagline: "AI that brings in business.",
    summary:
      "My AI implementation studio. It books meetings with buyers who need what you sell, and builds custom AI fixes for the work eating your week. I built the brand, site and company top to bottom.",
    year: "2025",
    status: "Live",
    role: "Founder — everything",
    stack: ["Next.js 14", "TypeScript", "Tailwind"],
    ai: ["AI lead generation", "Custom AI builds", "AI-assisted copy"],
    preview: { kind: "iframe", src: "https://spctr.run" },
    address: "spctr.run",
    visit: "https://spctr.run",
    links: [{ label: "Visit spctr.run", href: "https://spctr.run" }],
  },
  {
    slug: "hedgepredict",
    name: "HedgePredict",
    tagline: "The best play on Polymarket, and why.",
    summary:
      "A read-only prediction-market companion. A calibrated model makes the call, Claude explains it and grounds it in the news, and an MCP server lets any AI use the whole engine.",
    year: "2026",
    status: "Live",
    role: "Solo — product, design, engineering",
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Vercel"],
    ai: ["MCP server", "Tool use", "Calibrated model", "Web-grounded LLM"],
    preview: { kind: "iframe", src: "https://polymarket-companion-nu.vercel.app" },
    address: "hedgepredict · live",
    visit: "https://polymarket-companion-nu.vercel.app",
    links: [
      { label: "Open the live app", href: "https://polymarket-companion-nu.vercel.app" },
    ],
    caseStudy: {
      problem: {
        heading: "Hundreds of markets. No idea which one matters.",
        body: [
          "Polymarket lists hundreds of live markets at any moment. Finding the few where the crowd's price looks wrong means reading odds, liquidity, price history and the news behind all of it.",
          "Most tools either dump raw data on you or want your wallet so they can place trades. I wanted the opposite: a companion that tells you the play and why, then sends you to Polymarket to decide for yourself. No login, no wallet, no execution.",
        ],
      },
      build: {
        heading: "One engine, three front doors.",
        body: [
          "Live market data comes from Polymarket's public APIs and gets ranked by momentum, liquidity, uncertainty and timing. Every market gets a verdict from Jev, a calibrated decision model from TypeSafe. It answers one question: which side, if either, is underpriced? That becomes WAGER, LEAN or SKIP, with a confidence score, in about 0.3 seconds.",
          "Claude does the language work. A deep read uses web search to ground the call in current news. A cheaper model explains in plain English why Jev said what it said. An Ask chat can search the full Polymarket universe with tools, not just the markets on the board.",
          "The same engine is exposed as an MCP server with five tools, so Claude Desktop, Claude Code or any MCP client can ask HedgePredict for the best plays directly. On desktop it's a command center with ⌘K search; on the phone it's a Flighty-style board grouped by when markets resolve.",
        ],
      },
      architecture: {
        heading: "How the pieces connect.",
        intro:
          "Every screen goes through the same functions in lib/. The website, the chat and the MCP server can't disagree, and swapping a provider touches one file.",
        flow: [
          { label: "Polymarket APIs", detail: "Gamma markets + CLOB price history, normalized into typed data" },
          { label: "Ranking engine", detail: "Momentum, liquidity, uncertainty, timeliness; edge + Kelly sizing" },
          { label: "Jev (TypeSafe)", detail: "Which side is underpriced? WAGER / LEAN / SKIP, batched + cached 10 min" },
          { label: "Claude", detail: "Opus for web-grounded deep reads, Sonnet for explainers and chat" },
          { label: "Front doors", detail: "Web app · Ask chat with tools · MCP server (5 tools)" },
        ],
      },
      concepts: [
        {
          name: "MCP (Model Context Protocol)",
          body: "HedgePredict is also an API that AIs can use. get_best_plays, get_jev_read, recommend_market, analyze_edge and get_market_history are thin wrappers around the app's own functions. In MCP, the tool description is the instruction manual.",
        },
        {
          name: "Brain vs. mouth",
          body: "Jev isn't an LLM. It takes structured state and returns calibrated probabilities. Claude narrates the verdict but isn't allowed to re-decide it. Splitting judgment from language keeps the numbers honest.",
        },
        {
          name: "Tool use in chat",
          body: "Ask chat has tools to search every tradable market and pull Jev's verdict, so 'any good bitcoin plays?' finds markets that aren't on the dashboard.",
        },
        {
          name: "Cost-aware design",
          body: "I measured cost per click. Jev is ~570 tokens; a web-grounded deep read is 15–25¢. Limits follow cost: 3 deep reads a day, generous limits on cheap calls, Opus only where it earns it.",
        },
        {
          name: "Provider swaps behind one function",
          body: "When Vercel's AI Gateway free tier dropped Jev, I moved to TypeSafe's SDK directly by editing only jev.ts. Every front door switched at once.",
        },
      ],
      broke: [
        {
          what: "Jev went dark in production: 'Free tier users do not have access to this model.'",
          lesson: "Integrations fail at the billing layer, not just in code. I dropped the middleman and called the model directly.",
        },
        {
          what: "Jev worked in production but not on the preview URL.",
          lesson: "The API key was scoped Production-only, and branch deploys count as Preview. Match env-var scope across every key.",
        },
        {
          what: "After a model upgrade, the deep read started answering with no news.",
          lesson: "The new model fired parallel web searches and used up the cap before results returned. No error was thrown; I only caught it by reading the output. Read the actual answers after every upgrade.",
        },
        {
          what: "Jev said SKIP on 18 out of 18 markets.",
          lesson: "The model was fine; my question was wrong. I'd asked 'is this the favorite?' instead of 'which side is underpriced?'. I reframed it as one choice over the sides, moved the WAGER/LEAN/SKIP rule into code, and the board came alive. How you frame the question is the integration.",
        },
        {
          what: "On the phone, the details sheet opened offscreen after scrolling.",
          lesson: "A leftover transform from a fade-in animation changed what 'fixed' anchors to. Test the deployed site, scrolled down, on a real device.",
        },
      ],
    },
  },
  {
    slug: "mission-control",
    name: "Mission Control",
    tagline: "Claude is my project manager.",
    summary:
      "A local command center for everything I build: one-click launch for every project, plus a Kanban board that Claude keeps current from our conversations.",
    year: "2026",
    status: "Local tool",
    role: "Solo — design + engineering",
    stack: ["Python (stdlib)", "Vanilla JS", "JSON store"],
    ai: ["Claude as operator", "CLI tool for AI", "Shared state"],
    preview: {
      kind: "image",
      src: "/work/mission-control.jpg",
      alt: "Mission Control projects view listing HedgePredict, SPCTR, the portfolio and Taste Vault with launch buttons",
    },
    address: "127.0.0.1:4700",
    links: [],
    caseStudy: {
      problem: {
        heading: "Claude Code isn't visual. My brain is.",
        body: [
          "I build everything with Claude Code in a terminal. That's fast, but my projects were spread across folders, each with its own run command, and tasks we agreed on got lost in chat scrollback.",
          "I wanted one screen that shows every project, launches any of them in a click, and tracks what's next, without making me the one who keeps it updated.",
        ],
      },
      build: {
        heading: "A launcher, then a board.",
        body: [
          "Each project card shows live data: git branch, uncommitted changes, last edit, and a Live badge found by checking the dev server's port. The buttons really do things: start the dev server, open Terminal, open Finder, or open Claude Code already in that folder.",
          "The Board tab is a Kanban with Not started, Up next, In progress, Blocked and Done. Claude acts as project manager: when we decide something in conversation, Claude adds the task or moves the card through a small CLI. I just look at the board.",
          "The first version looked like generic AI output: purple, bubbly, stock stat boxes. I scrapped it and rebuilt it in clean dark mode with sharp corners and one warm accent. Cards glide at 60fps using the FLIP technique.",
        ],
      },
      architecture: {
        heading: "One file, two writers.",
        intro:
          "The browser and Claude both edit the same tasks.json. A tiny shared store module makes them take turns so neither overwrites the other.",
        flow: [
          { label: "Me, in the browser", detail: "Drag cards, edit in a side panel, filter by project or owner" },
          { label: "Claude, in the terminal", detail: "task.py add / move, called on its own during our sessions" },
          { label: "tasks_store.py", detail: "File lock + atomic write, shared by server and CLI" },
          { label: "tasks.json", detail: "One plain file: readable, diffable, no database" },
        ],
      },
      concepts: [
        {
          name: "Giving an AI a tool, not a UI",
          body: "Claude can't click a Kanban board, but it can run a command. A 30-line CLI turned Claude from someone I report to into someone who keeps the board current.",
        },
        {
          name: "Small moves beat whole-file saves",
          body: "The page sends 'move this card' instead of 'here's the whole board', so an open tab can never wipe a task Claude just added.",
        },
        {
          name: "Build around how you already work",
          body: "I already talk to Claude all day. The board fits that habit, so it stays current without a new routine.",
        },
      ],
      broke: [
        {
          what: "Version one looked like every other AI-generated dashboard.",
          lesson: "Taste is part of the spec. I wrote my design rules down (dark, sharp, calm, 60fps) and now every build gets checked against them.",
        },
        {
          what: "Two writers, one file: the browser could overwrite Claude's edits.",
          lesson: "Shared state needs a single write path with a lock, and edits should be operations, not snapshots.",
        },
      ],
    },
  },
  {
    slug: "taste-vault",
    name: "Taste Vault",
    tagline: "A design vocabulary for AI to build from.",
    summary:
      "'Make it look good' is a bad prompt. This is a reference library that turns sites I like into specific language I can give Claude, plus live, running mockups.",
    year: "2026",
    status: "Local tool",
    role: "Adopted + reworked",
    stack: ["Vanilla JS", "Python (stdlib)", "Claude vision"],
    ai: ["Design briefs for AI", "Vision extraction", "Prompt context"],
    preview: {
      kind: "image",
      src: "/work/taste-vault.jpg",
      alt: "Taste Vault library in dark mode with collections in the sidebar and reference screenshots in a grid",
    },
    address: "127.0.0.1:4610",
    links: [{ label: "Original repo by cth9191", href: "https://github.com/cth9191/taste-vault" }],
    caseStudy: {
      credit:
        "Taste Vault is an open-source project by cth9191. I adopted it, restyled it to my design principles and added the Live builds shelf.",
      problem: {
        heading: "AI builds generic because we ask generically.",
        body: [
          "When you tell an AI to make something 'clean and modern,' you get the average of the internet. I kept getting purple gradients and rounded cards I didn't want.",
          "The fix is vocabulary. If I can name what I like (monumental editorial type, data as texture, a dither-mono palette), I can give Claude a brief it can actually build from.",
        ],
      },
      build: {
        heading: "Adopt, then make it mine.",
        body: [
          "I first built my own version from scratch, then found an open-source project that did it better. I deleted mine and adopted it. Each reference is stored with its collection, style family, vocabulary and notes, and 'Copy combined brief' turns a few picks into a prompt I paste into Claude Code.",
          "Then I made it mine. I restyled the whole interface to match my design rules (near-black, sharp 2px edges, hairlines, staggered motion) and added Live builds: running HTML mockups instead of screenshots, with Desktop, Tablet and Mobile toggles. That's where I compared four homepage concepts for SPCTR before picking one.",
        ],
      },
      architecture: {
        heading: "From screenshot to brief.",
        intro: "Every reference becomes structured data, and structured data becomes prompt context.",
        flow: [
          { label: "A site I like", detail: "Screenshot or a live HTML build" },
          { label: "Claude vision", detail: "Extracts title, style family, vocabulary, image recipe" },
          { label: "gallery.json / live.json", detail: "Data, not code: a new entry is one object" },
          { label: "Combined brief", detail: "Compare up to 3, copy one brief" },
          { label: "Claude Code", detail: "Builds from specific language, not 'make it pop'" },
        ],
      },
      concepts: [
        {
          name: "Context beats cleverness",
          body: "Most of prompting well is providing the right context. A precise design vocabulary does more than any magic phrase.",
        },
        {
          name: "Vision models as data entry",
          body: "Claude looks at a screenshot and writes the structured metadata, so the library grows without hand-tagging.",
        },
        {
          name: "Don't rebuild what exists",
          body: "Adopting a better open-source tool and extending it beat polishing my own. The skill is knowing when to switch.",
        },
      ],
      broke: [
        {
          what: "Screenshots can't show motion, and motion is half of what I care about.",
          lesson: "Keep the reference in the same medium as the thing it references. That's why I added Live builds.",
        },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
