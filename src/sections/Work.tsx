import type { CSSProperties } from 'react'
import { Arrow } from '../components/Logo'
import { Photo } from '../components/Photo'
import { Eyebrow, Line, Reveal } from '../components/Reveal'
import { business, work } from '../content/site'

// Mobile footprints (2-column grid); large screens use explicit placement from content.
const MOBILE: Record<(typeof work)[number]['m'], { cls: string; sizes: string }> = {
  big: { cls: 'col-span-2 row-span-2', sizes: '(min-width: 64rem) 50vw, 100vw' },
  wide: { cls: 'col-span-2', sizes: '(min-width: 64rem) 50vw, 100vw' },
  tall: { cls: 'row-span-2', sizes: '(min-width: 64rem) 25vw, 50vw' },
  std: { cls: '', sizes: '(min-width: 64rem) 25vw, 50vw' },
}
const PLACE = 'work-cell'

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="grain bg-paper py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <header className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <Eyebrow index="03">Our Work</Eyebrow>
            <Reveal as="h2" variant="lines" id="work-title" className="display mt-6 text-[clamp(4.5rem,19vw,14rem)]">
              <Line>
                The <span className="accent text-[0.7em] normal-case text-sky-deep">look</span>book.
              </Line>
            </Reveal>
          </div>
          <Reveal className="flex max-w-sm flex-col items-start gap-5 xl:items-end xl:pb-4 xl:text-right" delay={150}>
            <p className="eyebrow inline-flex items-center gap-2 border border-charcoal/30 px-3 py-1.5 text-[0.62rem] tracking-[0.16em] text-charcoal/75 sm:whitespace-nowrap">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tan" />
              Sample imagery · LVL 11 work coming soon
            </p>
            <p className="text-charcoal/75">
              Blonde transformations, lived-in color, sharp cuts and serious length. The latest chair-side results live on
              Instagram.
            </p>
          </Reveal>
        </header>

        <ul className="mt-12 grid auto-rows-[clamp(11rem,46vw,17rem)] grid-flow-row-dense grid-cols-2 gap-2 sm:gap-3 lg:mt-20 lg:auto-rows-[clamp(7rem,9vw,10.5rem)] lg:grid-cols-12 lg:grid-rows-[repeat(8,clamp(7rem,9vw,10.5rem))] lg:gap-4">
          {work.map((w, i) => (
            <li key={w.photo} className={`${MOBILE[w.m].cls} ${PLACE}`} style={{ '--c': w.col, '--r': w.row } as CSSProperties}>
              <Reveal variant="image" delay={(i % 4) * 80} className="group relative h-full overflow-hidden">
                <Photo
                  name={w.photo}
                  sizes={MOBILE[w.m].sizes}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent opacity-80 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100"
                />
                <p className="eyebrow absolute bottom-3 left-3 text-[0.65rem] text-ivory transition-transform duration-500 ease-out-expo lg:translate-y-8 lg:group-hover:translate-y-0">
                  {w.label}
                </p>
              </Reveal>
            </li>
          ))}
          <li className={`col-span-2 ${PLACE}`} style={{ '--c': '10 / 13', '--r': '7 / 9' } as CSSProperties}>
            <Reveal delay={240} className="h-full">
              <a
                href={business.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="on-dark group flex h-full flex-col justify-between bg-charcoal p-5 text-ivory transition-colors duration-500 hover:bg-ink sm:p-6"
              >
                <span className="eyebrow text-[0.65rem] text-sky">Fresh out the chair</span>
                <span className="display text-[clamp(2.75rem,11vw,4rem)] transition-colors group-hover:text-sky lg:text-[min(3.2vw,4rem)]">
                  {business.instagram.handle}
                </span>
                <span className="eyebrow flex items-center gap-3 text-[0.68rem]">
                  Follow along <Arrow dir="up-right" />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </Reveal>
          </li>
        </ul>

      </div>
    </section>
  )
}
