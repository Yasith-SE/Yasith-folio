"use client";

import Image from "next/image";
import { Panel } from "@/components/ui/Panel";

const PHOTOS = [
  { src: "/profile/yasith-1.jpg", alt: "Yasith Samarakoon, portrait with headphones at a laptop" },
  { src: "/profile/yasith-2.jpg", alt: "Yasith Samarakoon, working at a laptop with headphones around the neck" },
  { src: "/profile/yasith-4.png", alt: "Yasith Samarakoon, formal portrait on a white background" },
];

export function OperatorDossier() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
      <Panel eyebrow="OPERATOR DOSSIER" title="Yasith Samarakoon">
        <p className="text-sm leading-relaxed text-emerald-100/80">
          Full-Stack Software Engineer. GitHub: Yasith-SE.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-lg border border-zinc-700 bg-black/50 p-3">
            <dt className="text-[10px] uppercase tracking-widest text-zinc-500">Role</dt>
            <dd className="mt-1 text-emerald-100">Full-Stack Software Engineer</dd>
          </div>
          <div className="rounded-lg border border-zinc-700 bg-black/50 p-3">
            <dt className="text-[10px] uppercase tracking-widest text-zinc-500">Status</dt>
            <dd className="mt-1 text-omni-green">ONLINE</dd>
          </div>
        </dl>
      </Panel>

      <ul className="grid grid-cols-3 gap-3 lg:gap-4">
        {PHOTOS.map((photo) => (
          <li
            key={photo.src}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-emerald-500/40 bg-black/60 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 220px, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
