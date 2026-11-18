// Visual skins for the demo. A skin is only CSS custom properties, read by
// sift-demo.module.css and caption.module.css. Add another skin (for example a
// spctr.run one) without touching the engine, the storyboard or the renderer.

import type { CSSProperties } from "react";

export type Skin = {
  name: string;
  vars: Record<`--sd-${string}`, string>;
};

/** Sift's own App look (decided 2026-11-12): near-black, bone primary, state colours only. */
export const siftDark: Skin = {
  name: "sift-dark",
  vars: {
    "--sd-bg": "#09090b",
    "--sd-surface": "#131317",
    "--sd-panel": "#1b1b21",
    "--sd-s3": "#25252c",
    "--sd-ink": "#eeede7",
    "--sd-ink-2": "#c6c5bf",
    "--sd-mut": "#8d8c87",
    "--sd-line": "rgba(238,237,231,.08)",
    "--sd-line-2": "rgba(238,237,231,.17)",
    "--sd-green": "#6fcf8f",
    "--sd-green-t": "#7fd8a0",
    "--sd-yellow-t": "#efca6a",
    "--sd-red": "#ef7d7d",
    "--sd-red-t": "#f48b8b",
    "--sd-font": "Satoshi, system-ui, sans-serif",
    // the caption bar sits outside the app window, on the host page
    "--sd-cap-ink": "#f6f4ee",
    "--sd-cap-2": "rgba(246,244,238,.6)",
    "--sd-cap-mut": "rgba(246,244,238,.3)",
    "--sd-cap-line": "rgba(246,244,238,.1)",
    "--sd-cap-mono": "var(--font-mono), ui-monospace, monospace",
    "--sd-cap-font": "Satoshi, system-ui, sans-serif",
    "--sd-frame": "rgba(246,244,238,.1)",
  },
};

export const skinStyle = (skin: Skin) => skin.vars as CSSProperties;
