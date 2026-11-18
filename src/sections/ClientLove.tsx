import { Arrow } from '../components/Logo'
import { Photo } from '../components/Photo'
import { Eyebrow, Line, Reveal } from '../components/Reveal'
import { business } from '../content/site'

/**
 * Reviews section. Deliberately contains NO review text. Quotes must come from
 * real, attributable reviews with the reviewer's permission. Until then it
 * sends people to the salon's Google listing.
 */
export function ClientLove() {
  return (
    <section id="love" aria-labelledby="love-title" className="grain relative overflow-hidden bg-sky py-20 text-charcoal sm:py-28 lg:py-0">
      <div className="mx-auto grid max-w-[110rem] items-stretch gap-12 px-4 sm:px-6 lg:min-h-[52rem] lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7 lg:py-36">
          <Eyebrow index="05">Client Love</Eyebrow>
          <Reveal as="h2" variant="lines" id="love-title" className="display mt-6 whitespace-nowrap text-[clamp(4.5rem,19vw,11.5rem)] lg:text-[min(13vw,11.5rem)]">
            <Line>Word</Line>
            <Line delay={100} className="pl-[0.25em] sm:pl-[0.55em]">
              <span className="accent text-[0.7em] normal-case">of</span> mouth.
            </Line>
          </Reveal>
          <Reveal delay={200} className="mt-8 max-w-lg">
            <p className="text-lg leading-relaxed text-charcoal/85 sm:text-xl">
              Phoenix has been talking about LVL 11 for years. We’d rather you hear it from them than from us.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a href={business.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-dark min-h-14 px-7">
                Read our Google reviews
                <Arrow dir="up-right" />
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
              <a href={business.reviewsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow link-underline whitespace-nowrap px-1 py-3">
                Been in? Leave one
                <span className="sr-only">(opens Google Maps in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5">
          <Reveal variant="image" className="relative aspect-[4/5] sm:aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-[-2.5rem] lg:left-0 lg:aspect-auto">
            <Photo name="sky" sizes="(min-width: 64rem) 42vw, 100vw" className="h-full w-full" focus="38% 50%" />
          </Reveal>
          {/* oversized quote mark: purely typographic */}
          <span
            aria-hidden="true"
            className="accent pointer-events-none absolute -left-4 -top-16 select-none text-[16rem] leading-none text-ivory sm:-top-20 sm:text-[20rem] lg:-left-24 lg:top-24 lg:text-[26rem]"
          >
            “
          </span>
        </div>
      </div>
    </section>
  )
}
