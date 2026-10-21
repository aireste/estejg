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
  status: "Live" | "Local tool" | "Private system";
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
    year: "2026",
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
    preview: { kind: "iframe", src: "https://hedgepredict.co" },
    address: "hedgepredict.co",
    visit: "https://hedgepredict.co",
    links: [
      { label: "Open the live app", href: "https://hedgepredict.co" },
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
    slug: "claude-hq",
    name: "Claude HQ",
    tagline: "Claude Code that keeps working when I close my laptop.",
    summary:
      "A small server runs Claude Code around the clock. I message it from Telegram, it works on a branch while I'm away, and nothing goes live until I approve it with a tap.",
    year: "2026",
    status: "Private system",
    role: "Solo — design + engineering",
    stack: ["Python", "Bash", "systemd + tmux", "Telegram bot", "GitHub"],
    ai: ["Claude Code as operator", "Task queue", "Human approval gates", "Shared memory in files"],
    preview: {
      kind: "image",
      src: "/work/claude-hq.jpg",
      alt: "Diagram: a Telegram topic per project talks to Claude sessions on a server, which push branches to GitHub; I review and merge. Anything I can undo runs alone; anything I can't waits for my tap.",
    },
    address: "Private server",
    links: [],
    caseStudy: {
      problem: {
        heading: "I wanted Claude to keep working when I walk away.",
        body: [
          "I build with Claude Code in a terminal, and it stops the moment I close my laptop. I wanted it to keep going on a small server I own, reachable from my phone, without handing it the keys to everything.",
          "Running it all day is the easy part. The hard part is deciding what it may do on its own and what has to wait for me.",
        ],
      },
      build: {
        heading: "A server, a chat app and one rule.",
        body: [
          "A cheap cloud server runs one Claude Code session per project. A Telegram bot connects them: each project gets its own topic in one group chat, so talking to the right Claude means opening the right topic.",
          "Longer jobs go through a queue. I write a task as a short file with checkable steps. A runner starts it on its own git branch, confirms each step really changed something, and pings me with buttons when it's done or needs a decision. A 7 AM message tells me what to do first.",
          "The rule is simple: anything I can undo, it does at full speed. Anything I can't (sending to people, merging to main, spending money, deleting work) waits for my tap. Silence means hold, never yes.",
        ],
      },
      architecture: {
        heading: "Branches in, one human merge out.",
        intro:
          "Everything the server produces lands on a branch. Only I can put it on main.",
        flow: [
          { label: "Phone", detail: "A Telegram topic per project, with buttons for approvals" },
          { label: "Server", detail: "One Claude session per project folder, plus a task queue and a runner" },
          { label: "GitHub", detail: "Work arrives on branches; main is protected and needs my review" },
          { label: "Laptop", detail: "I open the link in the ping, check the result, and click merge" },
        ],
      },
      concepts: [
        {
          name: "Reversible or not",
          body: "I sort every action by one question: can I undo it? That decides what runs alone and what stops for me, and it's easier to trust than a long list of rules.",
        },
        {
          name: "Files are the shared memory",
          body: "My laptop Claude and the server Claude never share a conversation. They share written notes in a repo: what we decided, what's running, what's next. If it isn't written down, it doesn't travel.",
        },
        {
          name: "Evidence over memory",
          body: "Before it says something is merged or running, the agent checks the real source and says how it checked. Notes are a map, not the territory.",
        },
      ],
      broke: [
        {
          what: "One careless cleanup command killed every running session at once.",
          lesson: "I close things by their exact ID now, never by pattern.",
        },
        {
          what: "A new session reused an old window ID and got attached to a dead topic, so nothing appeared in Telegram.",
          lesson: "Check that an ID is free before using it, and clear stale records first.",
        },
        {
          what: "Scheduled jobs I had switched on never actually started, so the 'all quiet' signal was silence, not health.",
          lesson: "After enabling anything scheduled, confirm the real next-run time.",
        },
      ],
    },
  },
  {
    slug: "crm-audit",
    name: "CRM Audit Engine",
    tagline: "Finds the bad records in a CRM and proves it before touching one.",
    summary:
      "A tool that reads a HubSpot portal, counts the junk, duplicates and orphaned records with plain code, and gives back one score plus an undoable fix list. Built and tested on made-up data and a free HubSpot test account; not yet run on a client's portal.",
    year: "2026",
    status: "Local tool",
    role: "Solo — design + engineering",
    stack: ["Python (stdlib)", "SQLite", "HubSpot API", "Headless Chrome"],
    ai: ["Code counts, AI explains", "Independent test data", "Mutation testing", "Model bake-off"],
    preview: {
      kind: "image",
      src: "/work/crm-audit.jpg",
      alt: "Sample CRM audit report for a made-up company: a usable data score of 68 percent, 3,802 of 5,606 contacts usable, with the reasons the rest are not",
    },
    address: "Runs on my laptop",
    links: [],
    caseStudy: {
      problem: {
        heading: "Nobody trusts a cleanup they can't check.",
        body: [
          "HubSpot portals fill up with junk emails, duplicates and contacts owned by people who left. At renewal, the company pays for every marketing contact in there. Most audits I saw were a person eyeballing exported lists.",
          "I wanted a tool that counts the mess with code, shows its working, and makes every fix undoable. Then I wanted evidence that it was right before anyone trusted it.",
        ],
      },
      build: {
        heading: "Nine rules, a score and an undo button.",
        body: [
          "The engine copies a portal into a local database and runs nine checks, sorted by risk. Some changes are fully reversible, like moving a contact to non-marketing. Some need an owner's review, like a company with no contacts and no activity in a year. Some only a person should decide, like two contacts who might be the same human.",
          "Here is the kind of thing it catches, all made up: a contact whose email is test@example.com. Two records named Dana Reyes at the same company with different emails. A contact assigned to a salesperson who left in March. On a made-up company called Northwind Supply, the output is one number: 68% of contacts are usable today, 3,802 of 5,606.",
          "Every repair takes a checkpoint first and can be undone. Merges are never automatic, because a merge can't be undone.",
          "Where it stands: built and tested on made-up data and a free HubSpot test account. It has not run on a client's portal yet.",
        ],
      },
      architecture: {
        heading: "Code counts. AI only explains.",
        intro:
          "Every number comes from plain code. A model never decides what's bad; at most it writes the explanation from numbers the code already computed.",
        flow: [
          { label: "HubSpot, read-only", detail: "Pull contacts, companies and owners into a local copy" },
          { label: "Local database", detail: "A SQLite file on my laptop; nothing is uploaded anywhere" },
          { label: "Nine rules", detail: "Each one has a plain-English definition written before its code" },
          { label: "Report and fix list", detail: "A score, the reasons, and exact record lists to review" },
          { label: "Repair, with undo", detail: "A checkpoint first, then only the changes a person approves" },
        ],
      },
      concepts: [
        {
          name: "A test that knows the answer",
          body: "A separate agent wrote a messy dataset with a hidden answer key and never saw my code. That's how I found mistakes my own tests couldn't see.",
        },
        {
          name: "Break the code on purpose",
          body: "For each rule I make the code wrong on purpose and check that the tests turn red. A test that can't fail isn't testing anything.",
        },
        {
          name: "Say what you didn't prove",
          body: "Three of the nine rules were confirmed on a real HubSpot test account. The other six depend on dates HubSpot sets itself, so I can only show them on made-up data. The report says so.",
        },
      ],
      broke: [
        {
          what: "My fake HubSpot agreed with my own wrong guess.",
          lesson: "I had assumed where HubSpot marks a field read-only, and the fake copied the assumption, so every test passed. One look at a real response showed it was wrong, before anything was written.",
        },
        {
          what: "The 'empty company' rule flagged brand-new companies.",
          lesson: "On a fresh made-up dataset about half its flags were wrong: a company created last month with nothing logged looked abandoned. I fixed the definition first, then the code, then re-measured on new data.",
        },
        {
          what: "I tried an AI classifier for 'is this the same person?' and it was a coin flip.",
          lesson: "With only numbers allowed in (no names or emails), neither it nor my own scoring could tell two people from one. I wrote the result down and didn't ship it. It's the right tool in HedgePredict, where the inputs are numbers.",
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
