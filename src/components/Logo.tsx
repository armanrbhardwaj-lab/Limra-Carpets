export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="4" y="8" width="56" height="48" rx="4" fill="var(--primary)" />
      <rect x="9" y="13" width="46" height="38" rx="2" fill="none" stroke="var(--gold)" strokeWidth="2.5" />
      <path d="M32 18 L45 32 L32 46 L19 32 Z" fill="var(--gold)" />
      <path d="M32 25 L39 32 L32 39 L25 32 Z" fill="var(--primary)" />
      <circle cx="32" cy="32" r="2.6" fill="var(--teal)" />
      {[14, 22, 30, 38, 46].map((x) => (
        <line key={x} x1={x + 2} y1="56" x2={x + 2} y2="61" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold tracking-[0.18em] ${inverted ? "text-primary-foreground" : "text-primary"}`}>LIMRA</span>
        <span className="block text-[10px] font-semibold tracking-[0.42em] text-gold">CARPETS</span>
      </span>
    </span>
  );
}
