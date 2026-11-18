import { useEffect, useState } from 'react'
import { Arrow, Swash } from '../components/Logo'
import { Photo } from '../components/Photo'
import { Eyebrow, Line, Reveal } from '../components/Reveal'
import { booking, business, hours } from '../content/site'
import { fmtTime, openStatus } from '../lib/hours'

export function Visit() {
  // compute on the client and refresh each minute
  const [status, setStatus] = useState(() => openStatus())
  useEffect(() => {
    const id = window.setInterval(() => setStatus(openStatus()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="visit" aria-labelledby="visit-title" className="grain bg-ivory py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <Eyebrow index="06">Visit</Eyebrow>
        <Reveal as="h2" variant="lines" id="visit-title" className="display mt-6 text-[clamp(4.25rem,18vw,16rem)]">
          <Line>Come</Line>
          <Line delay={110} className="pl-[0.2em] sm:pl-[0.7em]">
            <span className="relative inline-block">
              through.
              <Swash className="absolute -bottom-[0.04em] left-0 -z-10 h-[0.22em] w-full text-sky" />
            </span>
          </Line>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Address + actions */}
          <Reveal className="lg:col-span-5">
            <address className="not-italic">
              <p className="eyebrow text-charcoal/60">{business.name}</p>
              <p className="display mt-3 text-[clamp(2.6rem,7vw,4.25rem)] leading-[0.9]">
                4626 N 16th St
                <span className="block text-sky-deep">Suite 104</span>
              </p>
              <p className="mt-3 text-lg">
                {business.city}, {business.region} {business.postal}
              </p>
              <dl className="mt-8 grid gap-4 border-t border-charcoal/15 pt-6 text-lg">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <dt className="eyebrow text-charcoal/60">Phone</dt>
                  <dd>
                    <a href={business.phoneHref} className="link-underline">
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <dt className="eyebrow text-charcoal/60">Email</dt>
                  <dd>
                    <a href={`mailto:${business.email}`} className="link-underline break-all">
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <dt className="eyebrow text-charcoal/60">Instagram</dt>
                  <dd>
                    <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {business.instagram.handle}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </address>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a href={booking.href} className="btn-dark justify-between sm:col-span-2 lg:col-span-1 xl:col-span-2">
                {booking.label}
                <span className="flex items-center gap-3 font-normal tracking-[0.08em]">
                  <span className="hidden sm:inline lg:hidden xl:inline">{business.phoneDisplay}</span>
                  <Arrow />
                </span>
              </a>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-line justify-between">
                Get directions
                <Arrow dir="up-right" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <a href={`mailto:${business.email}`} className="btn-line justify-between">
                Email us
                <Arrow />
              </a>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal className="lg:col-span-4 lg:col-start-7" delay={120}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="eyebrow text-charcoal/60">Hours</h3>
              <p className="eyebrow flex items-center gap-2 text-[0.68rem]" aria-live="polite">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${status.open ? 'bg-sage shadow-[0_0_0_4px_rgb(135_148_131/0.25)]' : 'bg-tan'}`}
                />
                {status.label}
              </p>
            </div>
            <table className="mt-5 w-full border-t border-charcoal/15 text-left">
              <caption className="sr-only">Opening hours (Arizona time)</caption>
              <tbody>
                {hours.map((h, i) => {
                  const today = i === status.day
                  return (
                    <tr
                      key={h.day}
                      className={`border-b border-charcoal/15 ${today ? 'bg-sky/35' : ''}`}
                      aria-current={today ? 'date' : undefined}
                    >
                      <th scope="row" className="py-3.5 pl-2 font-normal">
                        <span className="display text-[1.75rem]">{h.day}</span>
                        {today && <span className="eyebrow ml-3 text-[0.62rem] text-charcoal/70">Today</span>}
                      </th>
                      <td className="py-3.5 pr-2 text-right tabular-nums">
                        {h.open && h.close ? (
                          `${fmtTime(h.open)} – ${fmtTime(h.close)}`
                        ) : (
                          <span className="text-charcoal/60">Closed</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="mt-5 text-charcoal/75">{business.walkIns}</p>
          </Reveal>

          {/* Image + coordinates */}
          <Reveal className="hidden lg:col-span-2 lg:block" delay={220}>
            <div className="sticky top-28">
              <Reveal variant="image" className="aspect-[3/5]">
                <Photo name="curl" sizes="16vw" className="h-full w-full" focus="58% 50%" />
              </Reveal>
              <p className="eyebrow mt-4 text-[0.62rem] leading-relaxed text-charcoal/60">
                33.5054° N
                <br />
                112.0478° W
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
