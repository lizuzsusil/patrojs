function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--pjs-section-text-muted)]">{eyebrow}</p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--pjs-section-text-primary)] sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-[15px] leading-relaxed text-[var(--pjs-section-text-secondary)]">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading;