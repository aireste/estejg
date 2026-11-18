// The Sift storyboard: every scene time, number, fake lead and caption lives here,
// separate from the skin (skin.ts) and the playback engine (engine.ts).
// All data is invented. Domains use the reserved .example TLD.

export type Step = {
  label: string;
  sub: string;
  start: number; // ms: the step lights up
  done: number; // ms: the step finishes and its number rolls up
  value: number;
  hero: string; // words beside the big number once this step is done
};

export type Check = { label: string; value: string; ok: boolean };

export type Lead = {
  name: string;
  meta: string;
  verdict: string;
  good: boolean;
  checks: Check[];
  quote: { source: string; text: string };
  decision: "approve" | "reject";
  enterAt: number;
  rejectPressAt?: number; // reject only: the Reject button squishes and the reasons open
  reasons?: string[];
  reasonPick?: number;
  armAt: number; // the card leans toward its side
  outAt: number; // the card flies off
};

export type Caption = { word: string; line: string; from: number };

export type Story = {
  durationMs: number;
  fadeOutAt: number;
  ariaLabel: string;
  campaign: { title: string; tag: string; sub: string };
  tabs: string[];
  brief: {
    prompt: string;
    request: string;
    hint: string;
    button: string;
    typeAt: number;
    charMs: number;
    pointerAt: number;
    pressAt: number;
    runAt: number;
  };
  steps: Step[];
  ask: {
    afterStep: number; // index of the step whose number the sheet waits on
    forStep: number; // index of the step it unlocks
    openAt: number;
    pointerAt: number;
    pressAt: number;
    closeAt: number;
    kicker: string;
    title: string;
    body: string;
    figures: { value: string; label: string }[];
    button: string;
    key: string;
    skip: string;
    note: string;
  };
  review: {
    at: number;
    total: number;
    approvedBefore: number;
    rejectedBefore: number;
    leads: Lead[];
  };
  finish: { at: number; kicker: string; value: number; label: string; note: string; meta: string };
  spent: { at: number; text: string }[];
  captions: Caption[];
};

export const siftStory: Story = {
  durationMs: 19000,
  fadeOutAt: 18400,
  ariaLabel:
    "Animated demo of Sift on practice data. A plain request is typed, Sift finds 1,980 businesses, 412 pass the free checks and 371 are small enough. A sheet asks for a yes before spending 166 Apollo credits, the yes is pressed, owners are found and emails verified. In Review one lead is approved and one rejected with a reason. It ends with 38 verified owners saved to an unsent draft. Nothing was sent.",
  campaign: {
    title: "Home services near Nashville",
    tag: "No client · Practice · fake data",
    sub: "Owner-run, 2 to 20 people, verified owner email.",
  },
  tabs: ["Brief", "Run", "Review", "Draft"],
  brief: {
    prompt: "Who do you want to reach?",
    request: "owner-run home-service companies near Nashville",
    hint: "Free checks run first. Every paid step asks.",
    button: "Find businesses",
    typeAt: 700,
    charMs: 44,
    pointerAt: 2500,
    pressAt: 3250,
    runAt: 3550,
  },
  steps: [
    { label: "Find", sub: "Google Maps", start: 3800, done: 4800, value: 1980, hero: "found" },
    { label: "Gates", sub: "Chains, duplicates, wrong places", start: 5000, done: 5800, value: 412, hero: "pass the checks" },
    { label: "Size", sub: "Owner-run, 2 to 20 people", start: 6000, done: 6700, value: 371, hero: "small enough" },
    { label: "Owners", sub: "Apollo + site scan", start: 9500, done: 10500, value: 214, hero: "owners found" },
    { label: "Verify", sub: "Every email checked", start: 10700, done: 11600, value: 41, hero: "valid emails" },
    { label: "Review", sub: "You decide", start: 12000, done: 15700, value: 38, hero: "approved" },
    { label: "Draft", sub: "Unsent", start: 15700, done: 15900, value: 38, hero: "in the draft" },
  ],
  ask: {
    afterStep: 2,
    forStep: 3,
    openAt: 7100,
    pointerAt: 8000,
    pressAt: 8900,
    closeAt: 9150,
    kicker: "Needs your yes",
    title: "Look up owners in Apollo",
    body: "Only for companies that passed every free check and the size gate.",
    figures: [
      { value: "166", label: "credits" },
      { value: "371", label: "companies in" },
      { value: "0", label: "wasted on drops" },
    ],
    button: "Look up owners",
    key: "Enter",
    skip: "Skip",
    note: "Nothing happens until you press it.",
  },
  review: {
    at: 12000,
    total: 41,
    approvedBefore: 37,
    rejectedBefore: 2,
    leads: [
      {
        name: "Otterbrook Plumbing & Drain",
        meta: "Plumbing · Franklin area · otterbrook.example",
        verdict: "Looks good: owner found, email valid",
        good: true,
        checks: [
          { label: "Owner", value: "Dana Whitlock, owner", ok: true },
          { label: "Email", value: "dana@otterbrook.example", ok: true },
          { label: "Size", value: "9 people", ok: true },
        ],
        quote: { source: "From their site · About", text: "Family-run since 2009. Dana still answers the phone." },
        decision: "approve",
        enterAt: 12000,
        armAt: 13000,
        outAt: 13450,
      },
      {
        name: "Bramblewick Pest Control",
        meta: "Pest control · Brentwood area · bramblewick.example",
        verdict: "Check this: may be part of a chain",
        good: false,
        checks: [
          { label: "Owner", value: "Regional manager listed", ok: false },
          { label: "Email", value: "office@bramblewick.example", ok: true },
          { label: "Size", value: "14 people", ok: true },
        ],
        quote: { source: "From their site · Locations", text: "One of 60 locations across the Southeast." },
        decision: "reject",
        enterAt: 13500,
        rejectPressAt: 14250,
        reasons: ["Part of a chain", "Not the owner", "Wrong area"],
        reasonPick: 0,
        armAt: 14900,
        outAt: 15300,
      },
    ],
  },
  finish: {
    at: 15800,
    kicker: "Queue clear",
    value: 38,
    label: "owners with a verified email",
    note: "Saved to an unsent draft. Nothing was sent.",
    meta: "3 rejected, each with a reason · $1.42 spent",
  },
  spent: [
    { at: 0, text: "$0.00" },
    { at: 4800, text: "$0.38" },
    { at: 10500, text: "$1.04" },
    { at: 11600, text: "$1.42" },
  ],
  captions: [
    { word: "Find", line: "Type the request in plain words. Sift searches the map.", from: 0 },
    { word: "Check", line: "Free checks drop chains, wrong places and companies too big.", from: 5000 },
    { word: "Owners", line: "Looking up owners costs money, so Sift asks first.", from: 7000 },
    { word: "Verify", line: "Every email is checked. Only valid ones count.", from: 10700 },
    { word: "Review", line: "A person approves or rejects each lead.", from: 11900 },
    { word: "Draft", line: "Verified leads go to an unsent draft. A person sends.", from: 15700 },
  ],
};
