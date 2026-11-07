// Omnitrix hourglass: two curved-edge wedges meeting at a sharp center waist.
export function HourglassSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M20.3 17Q50 -3 79.7 17L50 50ZM20.3 83Q50 103 79.7 83L50 50Z"
        fill="#7be855"
      />
    </svg>
  );
}
