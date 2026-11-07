"use client";

import { DNA_FORMS } from "@/lib/data/dna-forms";
import { MISSIONS } from "@/lib/data/missions";
import { playDialClick } from "@/lib/omnitrix-audio";
import { useState } from "react";
import { DnaTelemetryPanel } from "@/components/dna/DnaTelemetryPanel";
import { SkillDial } from "@/components/dna/SkillDial";
import { Panel } from "@/components/ui/Panel";

export function DnaDatabase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const form = DNA_FORMS[activeIndex];
  const relatedMissions = MISSIONS.filter((mission) => mission.forms.includes(form.code));

  function selectForm(index: number) {
    if (index !== activeIndex) playDialClick();
    setActiveIndex(index);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <Panel eyebrow="ALIEN DNA DATABASE" title="Omnitrix Skill Selector">
        <SkillDial forms={DNA_FORMS} activeIndex={activeIndex} onSelect={selectForm} />
      </Panel>

      {/* Keyed by form so the telemetry animations replay on every selection. */}
      <DnaTelemetryPanel key={form.code} form={form} missions={relatedMissions} />
    </div>
  );
}
