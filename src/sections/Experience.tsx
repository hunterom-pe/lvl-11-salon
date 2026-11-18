import { Photo } from '../components/Photo'
import { Eyebrow, Line, Reveal } from '../components/Reveal'
import { Swash } from '../components/Logo'
import { business } from '../content/site'

const PILLARS = [
  { k: 'Come as you are', v: 'No dress code, no attitude at the door. Just a chair that’s all yours.' },
  { k: 'Talk it through', v: 'We listen first: your hair history, your routine, the photo you saved three months ago.' },
  { k: 'Leave turned up', v: 'Hair that looks like you, only louder. And a plan for keeping it that way.' },
]

export function Experience() {
  return (
    <section
      id="salon"
      aria-labelledby="salon-title"
      className="on-dark grain relative overflow-hidden bg-charcoal py-20 text-ivory sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-10">
        <Eyebrow index="02" className="text-sky">
          The Salon
        </Eyebrow>
        <Reveal as="h2" variant="lines" id="salon-title" className="display mt-6 text-[clamp(4rem,17.5vw,13.5rem)]">
          <Line>Turned up,</Line>
          <Line delay={120} className="text-sky">
            never uptight.
          </Line>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Image stack */}
          <div className="relative lg:col-span-7">
            <Reveal variant="image" className="aspect-[4/5] w-[88%] sm:w-[76%] lg:w-[78%]">
              <Photo name="experience" sizes="(min-width: 64rem) 42vw, 88vw" className="h-full w-full" />
            </Reveal>
            <Reveal
              variant="image"
              delay={250}
              className="absolute -bottom-10 right-0 aspect-[3/4] w-[46%] border-[6px] border-charcoal sm:w-[40%] lg:-bottom-16 lg:w-[40%] lg:border-8"
            >
              <Photo name="brush" sizes="(min-width: 64rem) 22vw, 46vw" className="h-full w-full" />
            </Reveal>
            {/* walk-in "sticker" */}
            <div
              className="absolute left-[60%] top-6 flex h-28 w-28 -translate-x-1/2 rotate-[-12deg] items-center justify-center rounded-full bg-sky p-3 text-center text-charcoal sm:h-32 sm:w-32 lg:left-[74%] lg:top-14 lg:h-36 lg:w-36"
              aria-hidden="true"
            >
              <span className="display text-[1.35rem] leading-[0.9] sm:text-[1.55rem]">
                Walk-ins
                <br />
                welcome
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="mt-12 flex flex-col justify-between gap-12 lg:col-span-5 lg:mt-0 lg:pl-6">
            <Reveal>
              <p className="text-xl leading-relaxed text-ivory/90 sm:text-2xl">
                LVL 11 is an independent salon on 16th Street in Phoenix. We like our hair the way we like our music:
                <span className="accent text-sky"> turned all the way up.</span>
              </p>
              <p className="mt-5 text-ivory/70">{business.walkIns}</p>
            </Reveal>

            <ol className="border-t border-ivory/15">
              {PILLARS.map((p, i) => (
                <Reveal as="li" key={p.k} delay={i * 100} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-ivory/15 py-6">
                  <span className="eyebrow pt-2 tabular-nums text-sky">0{i + 1}</span>
                  <div>
                    <h3 className="display text-[2.25rem] sm:text-[2.6rem]">{p.k}</h3>
                    <p className="mt-2 text-ivory/70">{p.v}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        {/* Their own words, from the current lvl11phx.com */}
        <Reveal as="figure" className="relative mx-auto mt-28 max-w-5xl text-center lg:mt-40">
          <blockquote>
            <p className="accent text-[clamp(2.1rem,5.6vw,4.75rem)] leading-[1.02] text-ivory">
              “We believe beauty lies within. We are here to bring it out.”
            </p>
          </blockquote>
          <Swash className="mx-auto mt-6 h-5 w-48 text-sky sm:w-64" />
          <figcaption className="eyebrow mt-4 text-ivory/60">The LVL 11 philosophy</figcaption>
        </Reveal>
      </div>
    </section>
  )
}
