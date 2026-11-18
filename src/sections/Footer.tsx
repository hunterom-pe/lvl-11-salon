import { Arrow, Logo } from '../components/Logo'
import { photos } from '../content/photos'
import { booking, business, concept, nav } from '../content/site'

const year = new Date().getFullYear()

export function Footer() {
  const credits = Object.values(photos)
  return (
    <footer className="on-dark grain relative overflow-hidden bg-charcoal text-ivory">
      <div className="mx-auto max-w-[110rem] px-4 pt-20 sm:px-6 lg:px-10 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="display text-[clamp(3rem,9vw,6rem)]">
              Ready to <span className="text-sky">turn it up?</span>
            </p>
            <a href={booking.href} className="btn-primary mt-8 min-h-14 px-7">
              {booking.label}
              <Arrow />
            </a>
            <p className="mt-4 text-ivory/65">
              {booking.hint}. {business.walkIns}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow text-ivory/50">Explore</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="link-underline text-lg">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#people" className="link-underline text-lg">
                  Our People
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-ivory/50">Find us</p>
            <address className="mt-5 space-y-3 text-lg not-italic">
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-underline block">
                {business.street}
                <br />
                {business.city}, {business.region} {business.postal}
                <span className="sr-only"> (directions open in Google Maps)</span>
              </a>
              <a href={business.phoneHref} className="link-underline block">
                {business.phoneDisplay}
              </a>
              <a href={`mailto:${business.email}`} className="link-underline block break-all">
                {business.email}
              </a>
              <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline block">
                Instagram {business.instagram.handle}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Oversized sign-off */}
      <div className="mx-auto mt-20 max-w-[110rem] px-2 sm:px-4 lg:mt-28 lg:px-8">
        <Logo className="h-auto w-full text-ivory" title="LVL 11 Salon" />
      </div>

      <div className="mx-auto mt-10 max-w-[110rem] border-t border-ivory/15 px-4 py-8 text-sm text-ivory/60 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-xl">
            <span className="text-ivory/85">{concept.note}</span>{' '}
            Design &amp; build by{' '}
            <a href={concept.url} target="_blank" rel="noopener noreferrer" className="link-underline text-ivory/85">
              {concept.studio}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . © {year}. “LVL 11 Salon” and its name belong to the salon.
          </p>
          <details className="group max-w-xl lg:text-right">
            <summary className="cursor-pointer list-none eyebrow text-[0.68rem] text-ivory/70 hover:text-sky [&::-webkit-details-marker]:hidden">
              Photo credits <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 text-left text-[0.8rem] leading-relaxed lg:text-right">
              Temporary sample photography via{' '}
              <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline">
                Unsplash
              </a>{' '}
              (not LVL 11 client work):{' '}
              {credits.map((c, i) => (
                <span key={c.key}>
                  <a href={c.credit.page} target="_blank" rel="noopener noreferrer" className="underline decoration-ivory/30 hover:text-sky">
                    {c.credit.name}
                  </a>
                  {i < credits.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          </details>
        </div>
      </div>
    </footer>
  )
}
