const ITEMS = ['Cuts', 'Color', 'Balayage', 'Highlights', 'Extensions', 'Styling', 'Walk-ins welcome']

/** Scrolling type band between the hero and services. Decorative: hidden from AT. */
export function Ticker() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {ITEMS.map((t) => (
        <li key={t} className="flex items-center">
          <span className="display px-5 text-[clamp(2rem,6.5vw,4.25rem)] sm:px-8">{t}</span>
          <span className="block h-2.5 w-2.5 rotate-45 bg-sky" />
        </li>
      ))}
    </ul>
  )
  return (
    <div aria-hidden="true" className="on-dark overflow-hidden border-y border-ivory/10 bg-ink py-4 text-ivory sm:py-5">
      <div className="marquee flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}
