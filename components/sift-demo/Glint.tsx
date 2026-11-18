"use client";

// Glint: the transparent, single-colour eye mark. A ring with four gaps, a solid
// eyeball, the pupil a see-through hole. Geometry from the SPCTR master mark
// (viewBox 240 240 520 520). Motion is CSS only, driven by `mode`.

import { useId } from "react";
import type { GlintMode } from "./timeline";
import s from "./sift-demo.module.css";

const RING = [
  "M338.12,308.097c18.352-15.506,39.054-28.244,61.333-38.027 C377.172,279.853,356.472,292.591,338.12,308.097z",
  "M365.92,366.663c0.128-0.132,0.241-0.271,0.368-0.403C366.16,366.392,366.048,366.531,365.92,366.663z",
  "M659.193,601.902c14.719-22.911,24.745-49.11,28.421-77.326h62.381c0.001,0,0.002-0.007,0.003-0.014 h-62.385C683.932,552.778,673.908,578.984,659.193,601.902z",
  "M366.74,365.849c28.742-28.543,66.559-47.963,108.704-53.456V250.01c-0.008,0-0.016,0-0.023,0v62.377 C433.279,317.873,395.472,337.3,366.74,365.849z",
  "M524.63,749.976v0.028c43.464-4.262,83.651-19.74,117.799-43.367 C608.283,730.25,568.097,745.721,524.63,749.976z",
  "M312.385,524.562H250c11.664,118.941,106.507,213.781,225.444,225.442V687.62 C390.731,676.572,323.435,609.279,312.385,524.562z",
  "M687.613,475.375h62.385C738.333,356.518,643.491,261.594,524.63,250.01v62.384 C609.345,323.442,676.563,390.658,687.613,475.375z",
  "M659.193,601.902c-29.462,45.884-78.066,78.355-134.562,85.718v62.356 c43.467-4.255,83.652-19.726,117.799-43.339C701.685,665.669,742.623,600.011,750,524.576h-0.005h-62.381 C683.937,552.792,673.912,578.991,659.193,601.902z",
  "M312.385,475.375c5.501-42.164,24.952-79.989,53.536-108.712c0.128-0.132,0.24-0.271,0.368-0.403 c0.145-0.146,0.306-0.271,0.451-0.41c28.732-28.55,66.539-47.977,108.68-53.463V250.01v-0.014 c-26.805,2.621-52.284,9.672-75.967,20.074c-22.279,9.783-42.981,22.521-61.333,38.027 c-17.269,14.595-32.436,31.553-45.258,50.237c-23.317,33.987-38.614,73.891-42.838,117.042H312.385z",
];

export default function Glint({ mode, className }: { mode: GlintMode; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <span className={`${s.glint} ${className ?? ""}`} data-mode={mode} aria-hidden="true">
      <svg viewBox="240 240 520 520">
        <defs>
          <mask id={`${id}r`} maskUnits="userSpaceOnUse" x="200" y="200" width="600" height="600">
            <rect x="200" y="200" width="600" height="600" fill="#fff" />
            <circle cx="500" cy="500" r="168" fill="#000" />
          </mask>
          <mask id={`${id}p`} maskUnits="userSpaceOnUse" x="-300" y="-300" width="600" height="600">
            <rect x="-300" y="-300" width="600" height="600" fill="#fff" />
            <g className={s.gpw}>
              <circle className={s.gpu} cx="0" cy="0" r="51" fill="#000" />
            </g>
          </mask>
        </defs>
        <g mask={`url(#${id}r)`} fill="currentColor">
          {RING.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g transform="translate(499 491)">
          <g className={s.glid}>
            <circle cx="0" cy="0" r="141" fill="currentColor" mask={`url(#${id}p)`} />
          </g>
        </g>
      </svg>
    </span>
  );
}
