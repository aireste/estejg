// Pure function: storyboard + time -> what is on screen. No React, no DOM.

import type { Story } from "./storyboard";

export type StepState = "wait" | "on" | "done";
export type GlintMode = "still" | "work" | "ask" | "happy";
export type LeadState = "hidden" | "in" | "armed" | "out";
export type PointerPhase = "off" | "start" | "there" | "leave";
export type Screen = "brief" | "run" | "review" | "done";

export type Frame = {
  fading: boolean;
  screen: Screen;
  typed: number;
  steps: StepState[];
  hero: number; // index of the newest finished step, -1 for none
  askOpen: boolean;
  askPressed: boolean;
  briefPressed: boolean;
  pointer: { target: "brief" | "ask"; phase: PointerPhase; pressed: boolean };
  glint: GlintMode;
  leads: LeadState[];
  rejectPressed: boolean[];
  reasons: number[]; // -1 hidden, 0 shown, 1 a reason picked
  approved: number;
  rejected: number;
  caption: number;
  spent: string;
};

const PRESS_MS = 170;
const POINTER_MOVE_MS = 90; // the pointer fades in at an offset, then travels

export function frameAt(s: Story, t: number): Frame {
  const b = s.brief;
  const a = s.ask;
  const r = s.review;

  const screen: Screen =
    t >= s.finish.at ? "done" : t >= r.at ? "review" : t >= b.runAt ? "run" : "brief";

  const steps: StepState[] = s.steps.map((st) => (t >= st.done ? "done" : t >= st.start ? "on" : "wait"));
  let hero = -1;
  steps.forEach((st, i) => {
    if (st === "done") hero = i;
  });

  const typed = Math.max(0, Math.min(b.request.length, Math.floor((t - b.typeAt) / b.charMs)));
  const askOpen = t >= a.openAt && t < a.closeAt;
  const briefPressed = t >= b.pressAt && t < b.pressAt + PRESS_MS;
  const askPressed = t >= a.pressAt && t < a.pressAt + PRESS_MS;

  // one scripted pointer: first for the brief button, then for the sheet's yes
  const leg = t >= a.pointerAt ? { target: "ask" as const, at: a.pointerAt, press: a.pressAt, leave: a.closeAt + 150 }
    : { target: "brief" as const, at: b.pointerAt, press: b.pressAt, leave: b.runAt + 150 };
  const phase: PointerPhase =
    t < leg.at ? "off" : t < leg.at + POINTER_MOVE_MS ? "start" : t < leg.leave ? "there" : "leave";
  const pointer = { target: leg.target, phase, pressed: t >= leg.press && t < leg.press + PRESS_MS };

  let approved = r.approvedBefore;
  let rejected = r.rejectedBefore;
  const leads: LeadState[] = [];
  const rejectPressed: boolean[] = [];
  const reasons: number[] = [];
  for (const l of r.leads) {
    const on = screen === "review" || screen === "done";
    leads.push(!on || t < l.enterAt ? "hidden" : t >= l.outAt ? "out" : t >= l.armAt ? "armed" : "in");
    rejectPressed.push(l.rejectPressAt !== undefined && t >= l.rejectPressAt && t < l.rejectPressAt + PRESS_MS);
    reasons.push(l.rejectPressAt === undefined || t < l.rejectPressAt ? -1 : t < l.rejectPressAt + 380 ? 0 : 1);
    if (t >= l.outAt) {
      if (l.decision === "approve") approved++;
      else rejected++;
    }
  }

  const anyOn = steps.some((x, i) => x === "on" && i < s.steps.length - 2);
  const glint: GlintMode = screen === "done" ? "happy" : askOpen ? "ask" : anyOn ? "work" : "still";

  let caption = 0;
  s.captions.forEach((c, i) => {
    if (t >= c.from) caption = i;
  });
  let spent = s.spent[0]?.text ?? "";
  for (const x of s.spent) if (t >= x.at) spent = x.text;

  return {
    fading: t >= s.fadeOutAt,
    screen,
    typed,
    steps,
    hero,
    askOpen,
    askPressed,
    briefPressed,
    pointer,
    glint,
    leads,
    rejectPressed,
    reasons,
    approved,
    rejected,
    caption,
    spent,
  };
}

export const frameKey = (f: Frame) => JSON.stringify(f);
