import { Arrow } from './Logo'
import type { Stylist } from '../content/site'
import { booking } from '../content/site'

/**
 * Reusable stylist card. Supply only owner-approved information.
 * - `bookingUrl` falls back to the salon's main booking action (currently: call).
 * - `instagram` is optional; the link is omitted when absent.
 */
export function StylistCard({ s, index }: { s: Stylist; index: number }) {
  const book = s.bookingUrl ?? booking.href
  const external = /^https?:/.test(book)
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <img
          src={s.photo}
          alt={`Portrait of ${s.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale-[35%] transition-[transform,filter] duration-[1.2s] ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        <span className="display absolute right-3 top-2 text-[3rem] text-ivory mix-blend-difference" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col border-b border-charcoal/15 pb-5 pt-4">
        <h3 className="display text-[2.4rem] leading-[0.9]">{s.name}</h3>
        <p className="eyebrow mt-2 text-[0.7rem] text-charcoal/65">{s.specialty}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={book}
            className="eyebrow link-underline inline-flex items-center gap-2 text-charcoal"
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Book with {s.name.split(' ')[0]}
            <Arrow className="arrow h-2.5 w-4" />
          </a>
          {s.instagram && (
            <a
              href={s.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow link-underline text-charcoal/65"
            >
              Instagram<span className="sr-only"> for {s.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
