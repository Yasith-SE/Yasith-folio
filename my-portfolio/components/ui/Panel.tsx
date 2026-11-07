"use client";

import type { CSSProperties, ReactNode } from "react";

type Props = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function Panel({ title, eyebrow, children, className = "" }: Props) {
  return (
    <section
      className={`relative rounded-2xl border border-emerald-500/40 bg-black/60 p-6 shadow-[0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-md ${className}`}
    >
      <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-omni-green" />
      <span aria-hidden="true" className="absolute bottom-0 right-0 h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-omni-green" />

      {eyebrow && (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function progressStyle(value: number): CSSProperties {
  return { "--potency": `${value}%` } as CSSProperties;
}
