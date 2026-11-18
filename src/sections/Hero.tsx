import { useEffect, useRef, type CSSProperties } from 'react'
import { Arrow, Swash } from '../components/Logo'
import { Photo } from '../components/Photo'
import { Line } from '../components/Reveal'
import { booking, business } from '../content/site'
import { photos } from '../content/photos'
import { useInView, useReducedMotion } from '../lib/hooks'

export function Hero() {
  const reduced = useReducedMotion()
  const mediaRef = useRef<HTMLDivElement>(null)
  const copyRef = useInView<HTMLDivElement>({ threshold: 0 })

  // Gentle parallax: the photo drifts slower than the page
  useEffect(() => {
    if (reduced) return
    const el = mediaRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = Math.min(window.scrollY, window.innerHeight * 1.2)
      el.style.transform = `translate3d(0, ${y * 0.28}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex min-h-[38rem] flex-col overflow-hidden bg-charcoal text-ivory h-[100svh] lg:min-h-[44rem]"
    >
      {/* Photograph */}
      <div ref={mediaRef} className="absolute inset-x-0 top-0 bottom-[calc(34%-2px)] -z-20 overflow-hidden will-change-transform lg:bottom-0">
        <Photo
          name="hero"
          priority
          sizes="100vw"
          className="hero-zoom h-full w-full bg-sky"
          imgClassName="lg:![object-position:var(--focus-lg)]"
          style={{ '--focus-lg': photos.hero.focusLg } as CSSProperties}
        />
        {/* mobile: photo melts into the charcoal type panel */}
        <div aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-1/2 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent lg:hidden" />
      </div>
      {/* Scrims: top for nav legibility; bottom fades the photo into charcoal (mobile) or darkens it (desktop) */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/45 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-[70%] bg-gradient-to-t from-ink/80 via-ink/30 to-transparent lg:block"
      />

      {/* Side meta (desktop) */}
      <p
        aria-hidden="true"
        className="eyebrow pointer-events-none absolute right-6 top-1/2 hidden origin-right -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-ivory/80 lg:right-10 lg:block"
        style={{ transform: 'translate(50%, -50%) rotate(90deg)', right: '2.75rem' }}
      >
        Phoenix, Arizona &nbsp;·&nbsp; 33.5054° N &nbsp;/&nbsp; 112.0478° W
      </p>

      <div
        ref={copyRef}
        className="mx-auto mt-auto w-full max-w-[110rem] px-4 pb-7 sm:px-6 sm:pb-12 lg:px-10 lg:pb-20"
      >
        <div className="relative">
          <h1
            id="hero-title"
            className="display relative"
            style={{ fontSize: 'clamp(4.25rem, min(25vw, 13.5svh), 7.5rem)' }}
          >
            <span className="sr-only">Hair, turned up. LVL 11 Salon, Phoenix, Arizona.</span>
            <span aria-hidden="true" className="relative block lg:hidden">
              <Line delay={250}>Hair,</Line>
              <Line delay={380}>Turned</Line>
              <Line delay={510} className="pl-[0.5em]">
                Up.
              </Line>
              <Swash
                className="brush-draw absolute -bottom-[0.2em] left-[0.1em] -z-10 h-[0.36em] w-[2.9em] text-sky"
                style={{ '--delay': '1100ms' } as CSSProperties}
              />
            </span>
            {/* Desktop: two dramatic lines, the second pushed right for asymmetry */}
            <span aria-hidden="true" className="relative hidden lg:block" style={{ fontSize: 'min(15.2vw, 30svh)' }}>
              <Line delay={250}>Hair,</Line>
              <Line delay={400} className="pl-[0.62em]">
                Turned up.
              </Line>
              <Swash
                className="brush-draw absolute -bottom-[0.2em] left-[0.5em] -z-10 h-[0.36em] w-[4.6em] text-sky"
                style={{ '--delay': '1150ms' } as CSSProperties}
              />
            </span>
          </h1>

          <div
            className="reveal mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between xl:absolute xl:right-16 xl:top-[1.5vw] xl:mt-0 xl:w-[20rem] xl:flex-col xl:items-start"
            style={{ '--delay': '900ms' } as CSSProperties}
          >
            <p className="max-w-[18rem] text-lg leading-snug text-ivory lg:text-xl">
              Good hair. Great people.
              <span className="block text-ivory/75">Phoenix, Arizona.</span>
            </p>
            <div className="flex flex-col gap-2">
              <a href={booking.href} className="btn-primary min-h-14 justify-between px-7 sm:justify-center">
                {booking.label}
                <Arrow />
              </a>
              <p className="eyebrow text-ivory/75">
                <span className="sr-only">Phone: </span>
                {business.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="eyebrow absolute left-4 top-[4.75rem] text-[0.62rem] tracking-[0.18em] text-ivory/70 sm:left-6 lg:left-10 lg:top-24">
        Design concept &nbsp;·&nbsp; sample photography
      </p>
    </section>
  )
}
