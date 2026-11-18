import { Arrow } from '../components/Logo'
import { Eyebrow, Line, Reveal } from '../components/Reveal'
import { StylistCard } from '../components/StylistCard'
import { booking, business, stylists, type Stylist } from '../content/site'

/**
 * Design-review only: visit /?preview=team to see the card layout populated.
 * These are visibly labelled placeholders and never render on the normal page.
 */
const PREVIEW: Stylist[] = [
  { name: 'Stylist Name', specialty: 'Blonding · Balayage', photo: '/images/brush-800.webp' },
  { name: 'Stylist Name', specialty: 'Precision cuts', photo: '/images/curl-800.webp', instagram: business.instagram.url },
  { name: 'Stylist Name', specialty: 'Extensions · Color', photo: '/images/experience-800.webp' },
]

export function People() {
  const preview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('preview') === 'team'
  const team = stylists.length ? stylists : preview ? PREVIEW : []

  return (
    <section id="people" aria-labelledby="people-title" className="bg-ivory py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="04">Our People</Eyebrow>
            <Reveal as="h2" variant="lines" id="people-title" className="display mt-6 whitespace-nowrap text-[clamp(4.5rem,19vw,14rem)] lg:text-[min(12.5vw,14rem)]">
              <Line>
                Meet <span className="accent text-[0.66em] text-sky-deep">the</span>
              </Line>
              <Line delay={120}>Band.</Line>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5 lg:pb-6" delay={150}>
            <p className="max-w-md text-lg leading-relaxed text-charcoal/80">
              The people behind the chair, and how to find the right one for your hair.
            </p>
          </Reveal>
        </div>

        {team.length > 0 ? (
          <>
            {preview && !stylists.length && (
              <p role="note" className="eyebrow mt-10 inline-block bg-tan/25 px-3 py-2 text-[0.68rem]">
                Design preview: placeholder profiles, not real LVL 11 staff
              </p>
            )}
            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4">
              {team.map((s, i) => (
                <Reveal as="li" key={`${s.name}-${i}`} delay={(i % 4) * 90}>
                  <StylistCard s={s} index={i} />
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <Reveal className="mt-12 grid overflow-hidden bg-charcoal text-ivory on-dark grain lg:mt-16 lg:grid-cols-12">
            <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-7 lg:p-14">
              <p className="eyebrow text-sky">Lineup announcement</p>
              <p className="display text-[clamp(3rem,9vw,6.5rem)]">
                Profiles <span className="accent text-sky">dropping</span> soon.
              </p>
              <p className="max-w-lg text-ivory/75">
                Stylist bios and individual booking links are on the way. Until then, call the salon and we’ll match you with
                the right chair for your hair.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={booking.href} className="btn-primary">
                  {booking.hint}
                  <Arrow />
                </a>
                <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="btn border border-ivory/40 hover:border-sky hover:text-sky">
                  Follow {business.instagram.handle}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
            {/* Ghosted card frames hint at the layout to come */}
            <div aria-hidden="true" className="relative hidden min-h-[26rem] lg:col-span-5 lg:block">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute aspect-[4/5] w-[52%] border border-ivory/20"
                  style={{ left: `${10 + i * 16}%`, top: `${14 + i * 8}%`, transform: `rotate(${(i - 1) * 4}deg)` }}
                >
                  <span className="display absolute bottom-3 left-3 text-[2.75rem] text-ivory/15">0{i + 1}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
