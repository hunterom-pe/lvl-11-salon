import { Arrow } from '../components/Logo'
import { Photo } from '../components/Photo'
import { Eyebrow, Line, Reveal } from '../components/Reveal'
import { booking, services } from '../content/site'
import { useMediaQuery } from '../lib/hooks'

// Desktop stagger: each column drops a little lower than the last
const OFFSETS = ['lg:mt-0', 'lg:mt-28', 'lg:mt-10', 'lg:mt-40']

export function Services() {
  // the rail only scrolls below the lg breakpoint; only then is it a keyboard stop
  const isRail = !useMediaQuery('(min-width: 64rem)')
  return (
    <section id="services" aria-labelledby="services-title" className="grain bg-ivory py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow index="01">Services</Eyebrow>
            <Reveal as="h2" variant="lines" className="display mt-6 text-[clamp(4.5rem,21vw,15rem)]" id="services-title">
              <Line>
                <span className="accent mr-[0.16em] text-[0.62em] text-sky-deep">The</span>Set
              </Line>
              <Line delay={120} className="pl-[0.9em] sm:pl-[1.4em]">
                List.
              </Line>
            </Reveal>
          </div>
          <Reveal className="max-w-md lg:col-span-4 lg:pb-6" delay={200}>
            <p className="text-lg leading-relaxed text-charcoal/80">
              Four ways in. Every appointment starts with a real conversation about your hair, your routine, and how loud you
              want to go.
            </p>
          </Reveal>
        </header>

        {/* Mobile: swipeable rail. Desktop: staggered editorial columns. */}
        {/* The scroll container is focusable so keyboard users can scroll the rail on small screens */}
        <div
          role={isRail ? 'region' : undefined}
          aria-label={isRail ? 'Services list' : undefined}
          tabIndex={isRail ? 0 : undefined}
          className="-mx-4 mt-14 snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:mt-20 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
        <ol className="flex gap-4 lg:grid lg:grid-cols-4 lg:gap-8">
          {services.map((s, i) => (
            <li key={s.title} className={`w-[78vw] max-w-[22rem] shrink-0 snap-start lg:w-auto lg:max-w-none ${OFFSETS[i]}`}>
              <article className="group">
                <Reveal variant="image" delay={i * 90} className="relative aspect-[3/4] overflow-hidden">
                  <Photo
                    name={s.photo}
                    sizes="(min-width: 64rem) 24vw, 78vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span className="display absolute left-3 top-2 text-[3.5rem] text-ivory/95 mix-blend-difference">
                    0{i + 1}
                  </span>
                </Reveal>
                <Reveal delay={i * 90 + 120}>
                  <h3 className="display mt-5 text-[2.6rem] leading-[0.88] [overflow-wrap:break-word] sm:text-[3rem] lg:text-[clamp(1.85rem,3vw,3.4rem)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[26rem] text-[0.98rem] leading-relaxed text-charcoal/75">{s.line}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1" aria-label={`${s.title} includes`}>
                    {s.tags.map((t) => (
                      <li key={t} className="eyebrow text-[0.68rem] text-charcoal/60">
                        {t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            </li>
          ))}
        </ol>
        </div>

        <Reveal className="mt-16 flex flex-col items-start gap-5 border-t border-charcoal/15 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-44">
          <p className="max-w-xl text-charcoal/75">
            Not sure what to book? Call and describe the hair you want. We’ll point you to the right chair and the right
            amount of time.
          </p>
          <a href={booking.href} className="btn-dark shrink-0">
            {booking.label}
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
