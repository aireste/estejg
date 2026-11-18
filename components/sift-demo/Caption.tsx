// The caption bar under the demo window: the step words in order, the current
// one bright, and a plain line saying what is happening. No aria-live on purpose:
// it changes every few seconds and would chatter. `active` -1 = static (all words even).

import type { ReactNode } from "react";
import type { Caption as CaptionT } from "./storyboard";
import s from "./caption.module.css";

export default function Caption({
  captions,
  active,
  line,
  children,
}: {
  captions: CaptionT[];
  active: number;
  line: string;
  children?: ReactNode;
}) {
  return (
    <div className={s.bar}>
      <ol className={s.words} aria-label="Steps">
        {captions.map((c, i) => (
          <li
            key={c.word}
            className={s.word}
            data-state={active < 0 ? "static" : i === active ? "cur" : i < active ? "past" : "next"}
            aria-current={i === active ? "step" : undefined}
          >
            {c.word}
          </li>
        ))}
      </ol>
      <div className={s.foot}>
        <p className={s.line} key={line}>
          {line}
        </p>
        {children}
      </div>
    </div>
  );
}
