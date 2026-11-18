"use client";

// Renderer: draws one Frame of the storyboard inside a fixed 960x600 canvas that
// is scaled (CSS transform) to fit its box. The canvas never reflows, so the phone
// view is the same picture, smaller. Portable: no site imports, styles are a CSS
// module that reads the skin's custom properties.

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { offsetWithin, useFitScale, useInView, usePageVisible, useStoryClock } from "./engine";
import { frameAt, frameKey, type Frame } from "./timeline";
import type { Story } from "./storyboard";
import { skinStyle, type Skin } from "./skin";
import Glint from "./Glint";
import RollingNumber from "./RollingNumber";
import Caption from "./Caption";
import s from "./sift-demo.module.css";

const W = 960;

export default function SiftDemo({
  story,
  skin,
  poster,
  className,
}: {
  story: Story;
  skin: Skin;
  poster?: ReactNode;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(frameRef, W);
  const inView = useInView(frameRef);
  const visible = usePageVisible();
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const paused = userPaused || hover || focus;

  const [frame, setFrame] = useState<Frame>(() => frameAt(story, 0));
  const [loop, setLoop] = useState(0);
  const last = useRef("");
  const lastLoop = useRef(0);

  const onFrame = useCallback(
    (t: number, l: number) => {
      if (l !== lastLoop.current) {
        lastLoop.current = l;
        setLoop(l);
      }
      const f = frameAt(story, t);
      const k = frameKey(f);
      if (k !== last.current) {
        last.current = k;
        setFrame(f);
      }
    },
    [story],
  );

  const running = scale > 0 && inView && visible && !paused;
  useStoryClock({ durationMs: story.durationMs, running, onFrame });

  return (
    <figure className={`${s.fig} ${className ?? ""}`} style={skinStyle(skin)}>
      <div
        ref={frameRef}
        className={s.frame}
        tabIndex={0}
        role="img"
        aria-label={story.ariaLabel}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        {poster}
        <div
          className={s.stage}
          aria-hidden="true"
          data-paused={paused || !running ? "1" : "0"}
          style={{ transform: `scale(${scale || 0.0001})`, opacity: scale > 0 ? 1 : 0 }}
        >
          <Scene key={loop} story={story} f={frame} />
        </div>
      </div>
      <figcaption>
        <Caption captions={story.captions} active={frame.caption} line={story.captions[frame.caption]?.line ?? ""}>
          <button
            type="button"
            className={s.ctl}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Play the demo" : "Pause the demo"}
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? (
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 1.8v8.4L10 6z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 2h2v8H3zM7 2h2v8H7z" fill="currentColor" />
              </svg>
            )}
            {userPaused ? "Play" : "Pause"}
          </button>
        </Caption>
      </figcaption>
    </figure>
  );
}

type Pts = { brief: { x: number; y: number }; ask: { x: number; y: number } };

function Scene({ story, f }: { story: Story; f: Frame }) {
  const root = useRef<HTMLDivElement>(null);
  const briefBtn = useRef<HTMLSpanElement>(null);
  const askBtn = useRef<HTMLSpanElement>(null);
  const [pts, setPts] = useState<Pts | null>(null);

  // measure the two pointer targets once (layout offsets ignore the scale transform)
  useLayoutEffect(() => {
    if (!root.current || !briefBtn.current || !askBtn.current) return;
    setPts({ brief: offsetWithin(briefBtn.current, root.current), ask: offsetWithin(askBtn.current, root.current) });
  }, []);

  const { brief, ask, review, finish, campaign } = story;
  const tab = { brief: 0, run: 1, review: 2, done: 3 }[f.screen];
  const left = review.total - f.approved - f.rejected;
  const heroStep = f.hero >= 0 && f.hero <= story.steps.length - 3 ? story.steps[f.hero] : null;
  const onStep = story.steps.findIndex((_, i) => f.steps[i] === "on");

  let status: ReactNode;
  if (f.screen === "brief") status = <>writing the brief</>;
  else if (f.askOpen) status = <><em className={s.y}>needs your yes</em>, {story.steps[ask.forStep].label}</>;
  else if (f.screen === "run") status = onStep >= 0 ? <>running {story.steps[onStep].label}</> : heroStep ? <>{heroStep.label} done</> : <>starting</>;
  else if (f.screen === "review") status = <>{left} left to review</>;
  else status = <><span className={s.g}>queue clear</span>, draft saved</>;

  const p = pts?.[f.pointer.target];

  return (
    <div ref={root} className={s.scene} data-fading={f.fading ? "1" : "0"}>
      {/* rail */}
      <nav className={s.rail}>
        <Glint mode={f.glint} className={s.railGlint} />
        <div className={s.icons}>
          <Icon d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" on={false} />
          <Icon d="M6 20V11M12 20V5M18 20v-6" on={false} />
          <Icon d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6" on />
          <Icon d="M3 13h5l1.5 3h5L16 13h5M5 5h14l2 8v6H3v-6z" on={false} />
        </div>
        <span className={s.gear}>
          <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.6 4.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" on={false} />
        </span>
      </nav>

      <main className={s.main}>
        <p className={s.status}>
          {campaign.title} (practice): {status} · {f.spent} spent
        </p>
        <p className={s.tag}>{campaign.tag}</p>
        <h3 className={s.h1}>{campaign.title}</h3>
        <div className={s.tabs}>
          {story.tabs.map((t, i) => (
            <span key={t} className={s.tab} data-st={i === tab ? "cur" : i < tab ? "done" : "next"}>
              {t}
            </span>
          ))}
        </div>

        {/* 1. Brief: the request types itself */}
        <section className={s.screen} data-show={f.screen === "brief" ? "1" : "0"}>
          <div className={s.briefCard}>
            <p className={s.prompt}>{brief.prompt}</p>
            <p className={s.typed}>
              {brief.request.slice(0, f.typed)}
              <span className={s.caret} data-done={f.typed >= brief.request.length ? "1" : "0"} />
            </p>
            <div className={s.briefFoot}>
              <span className={s.hint}>{brief.hint}</span>
              <span
                ref={briefBtn}
                className={s.go}
                data-ready={f.typed >= brief.request.length ? "1" : "0"}
                data-pressed={f.briefPressed ? "1" : "0"}
              >
                {brief.button}
                <kbd className={s.kbd}>Enter</kbd>
              </span>
            </div>
          </div>
        </section>

        {/* 2. Run: the steps light up, numbers roll */}
        <section className={s.screen} data-show={f.screen === "run" ? "1" : "0"}>
          <div className={s.hero}>
            {heroStep ? (
              <>
                <RollingNumber key={heroStep.value} value={heroStep.value} className={s.heroN} />
                <span className={s.heroL} key={heroStep.label}>
                  {heroStep.hero}
                  {f.hero === ask.afterStep && f.askOpen && <em className={s.y}> · needs your yes</em>}
                </span>
              </>
            ) : (
              <span className={`${s.heroN} ${s.heroWait}`}>…</span>
            )}
          </div>
          <div className={s.river}>
            {story.steps.map((st, i) => (
              <div key={st.label} className={s.row} data-st={f.steps[i]}>
                <span className={s.ring}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.rl}>{st.label}</span>
                <span className={s.rs}>{st.sub}</span>
                <span className={s.rv}>
                  {f.steps[i] === "done" && i < story.steps.length - 2 ? (
                    <RollingNumber value={st.value} />
                  ) : i < story.steps.length - 2 ? (
                    <span className={s.pg}>
                      <i style={{ transitionDuration: `${st.done - st.start}ms` }} />
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Review focus: one lead card at a time */}
        <section className={s.screen} data-show={f.screen === "review" ? "1" : "0"}>
          <div className={s.fbar}>
            <span className={s.fl}>
              <b>{left}</b> left to decide
            </span>
            <span className={s.fprog}>
              <i className={s.fa} style={{ transform: `scaleX(${f.approved / review.total})` }} />
              <span className={s.frw} style={{ transform: `translateX(${(f.approved / review.total) * 100}%)` }}>
                <i className={s.fr} style={{ transform: `scaleX(${f.rejected / review.total})` }} />
              </span>
            </span>
          </div>
          <div className={s.deck}>
            {review.leads.map((l, i) =>
              f.leads[i] === "hidden" ? null : (
                <article
                  key={l.name}
                  className={s.card}
                  data-st={f.leads[i]}
                  data-dir={l.decision === "approve" ? "r" : "l"}
                >
                  <span className={`${s.swl} ${l.decision === "approve" ? s.swa : s.swr}`}>
                    {l.decision === "approve" ? "Approve" : "Reject"}
                  </span>
                  <h4 className={s.name}>{l.name}</h4>
                  <p className={s.meta}>{l.meta}</p>
                  <p className={l.good ? s.vg : s.vb}>{l.verdict}</p>
                  <div className={s.chks}>
                    {l.checks.map((c) => (
                      <div key={c.label} className={s.ck}>
                        <span className={s.cka}>{c.label}</span>
                        <span className={s.ckb}>{c.value}</span>
                        <span className={c.ok ? s.g : s.r}>{c.ok ? "Pass" : "Check"}</span>
                      </div>
                    ))}
                  </div>
                  {l.reasons ? (
                    <div className={s.reasons} data-show={f.reasons[i] >= 0 ? "1" : "0"}>
                      {l.reasons.map((r, j) => (
                        <span key={r} className={s.reason} data-pick={f.reasons[i] === 1 && j === l.reasonPick ? "1" : "0"}>
                          {r}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className={s.site} data-hide={l.reasons && f.reasons[i] >= 0 ? "1" : "0"}>
                    <span>{l.quote.source}</span>
                    {l.quote.text}
                  </p>
                  <div className={s.act}>
                    <span className={s.rej} data-pressed={f.rejectPressed[i] ? "1" : "0"}>
                      Reject <kbd className={s.kbd}>X</kbd>
                    </span>
                    <span className={s.apr}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Approve <kbd className={s.kbd}>A</kbd>
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
          <aside className={s.queue}>
            <p className={s.qh}>Up next</p>
            {review.leads.map((l, i) => (
              <p key={l.name} className={s.qi} data-st={f.leads[i]}>
                <span>{l.name}</span>
                <small>{f.leads[i] === "out" ? (l.decision === "approve" ? "Approved" : "Rejected") : "To decide"}</small>
              </p>
            ))}
            <p className={s.qh}>Decided</p>
            <p className={s.qm}>
              <span className={s.g}>{f.approved} approved</span> · <span className={s.r}>{f.rejected} rejected</span>
            </p>
          </aside>
        </section>

        {/* 4. Queue clear */}
        <section className={s.screen} data-show={f.screen === "done" ? "1" : "0"}>
          {f.screen === "done" && (
            <div className={s.done}>
              <Glint mode="happy" className={s.doneGlint} />
              <p className={s.doneK}>{finish.kicker}</p>
              <div className={s.doneRow}>
                <RollingNumber value={finish.value} className={s.doneN} />
                <span className={s.doneL}>{finish.label}</span>
              </div>
              <p className={s.doneNote}>{finish.note}</p>
              <p className={s.doneMeta}>{finish.meta}</p>
            </div>
          )}
        </section>
      </main>

      {/* the ask: a bottom sheet */}
      <div className={s.sheet} data-show={f.askOpen ? "1" : "0"}>
        <span className={s.grip} />
        <p className={s.kick}>{ask.kicker}</p>
        <p className={s.st}>{ask.title}</p>
        <p className={s.sb}>{ask.body}</p>
        <div className={s.srow}>
          {ask.figures.map((x) => (
            <span key={x.label} className={s.fig3}>
              <b>{x.value}</b>
              {x.label}
            </span>
          ))}
          <span className={s.sgo}>
            <span ref={askBtn} className={s.go} data-ready="1" data-pressed={f.askPressed ? "1" : "0"}>
              {ask.button}
              <kbd className={s.kbd}>{ask.key}</kbd>
            </span>
            <small>{ask.note}</small>
          </span>
          <span className={s.skip}>{ask.skip}</span>
        </div>
      </div>

      {/* the scripted pointer */}
      {p && (
        <span
          className={s.pointer}
          data-phase={f.pointer.phase}
          data-pressed={f.pointer.pressed ? "1" : "0"}
          style={{
            transform:
              f.pointer.phase === "start" || f.pointer.phase === "off"
                ? `translate(${p.x + 150}px, ${p.y + 110}px)`
                : f.pointer.phase === "leave"
                  ? `translate(${p.x + 40}px, ${p.y + 60}px)`
                  : `translate(${p.x - 4}px, ${p.y - 2}px)`,
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3.2 19 12l-6.4 1.3L9 19.6z" fill="#fff" stroke="#09090b" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}

function Icon({ d, on }: { d: string; on: boolean }) {
  return (
    <span className={s.icon} data-on={on ? "1" : "0"}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
