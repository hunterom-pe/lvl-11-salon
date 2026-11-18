import { useCallback, useEffect, useRef, useState } from 'react'
import { Arrow, Logo } from '../components/Logo'
import { booking, business, nav } from '../content/site'
import { useScrolledPast } from '../lib/hooks'

export function Nav() {
  const scrolled = useScrolledPast(48)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Lock scroll, trap focus, close on Escape while the menu is open
  useEffect(() => {
    if (!open) return
    const { body, documentElement } = document
    const prev = body.style.overflow
    body.style.overflow = 'hidden'
    documentElement.dataset.menu = 'open'
    const panel = panelRef.current
    // the visible Close toggle lives in the header bar, so include it in the trap
    const focusables = () => [
      ...(toggleRef.current ? [toggleRef.current] : []),
      ...Array.from(panel?.querySelectorAll<HTMLElement>('a[href]') ?? []),
    ]
    requestAnimationFrame(() => focusables()[1]?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    const mq = window.matchMedia('(min-width: 64rem)')
    const onWide = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onWide)
    return () => {
      body.style.overflow = prev
      delete documentElement.dataset.menu
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [open, close])

  const solid = scrolled && !open
  const tone = solid ? 'text-charcoal' : 'text-ivory'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid ? 'bg-ivory/90 shadow-[0_1px_0_rgb(41_44_42/0.12)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex h-16 max-w-[110rem] items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-10 ${tone} transition-colors duration-500`}
        >
          <a href="#top" className="relative z-10 -ml-1 p-1" aria-label="LVL 11 Salon, back to top" onClick={() => open && close(false)}>
            <Logo className="h-9 w-auto lg:h-10" decorative />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="eyebrow link-underline py-2">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={booking.href}
              className={`btn hidden min-h-11 px-5 sm:inline-flex ${
                solid ? 'bg-charcoal text-ivory hover:bg-ink hover:text-sky' : 'bg-ivory text-charcoal hover:bg-sky'
              }`}
              aria-label={`${booking.label}: ${booking.hint}`}
            >
              {booking.label}
              <Arrow />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => (open ? close() : setOpen(true))}
            >
              <span className="eyebrow">{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-current transition-transform duration-500 ease-out-expo ${
                    open ? 'translate-y-[5px] rotate-[18deg]' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 h-[2px] bg-current transition-all duration-500 ease-out-expo ${
                    open ? 'w-full -translate-y-[5px] -rotate-[18deg]' : 'w-4'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu: a div[role=dialog] (not <dialog>) so the custom clip-path entrance works; focus trap + scroll lock live in the effect above */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="on-dark grain fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-charcoal px-4 pb-8 pt-24 text-ivory sm:px-6 lg:hidden"
      >
        <ol className="flex flex-col">
          {nav.map((n, i) => (
            <li key={n.id} className="border-b border-ivory/15" style={{ animationDelay: `${80 + i * 60}ms` }}>
              <a
                href={`#${n.id}`}
                onClick={() => close(false)}
                className="menu-item group flex items-baseline justify-between gap-4 py-3"
                style={{ animationDelay: `${60 + i * 70}ms` }}
              >
                <span className="display text-[clamp(3.25rem,17vw,6.5rem)] transition-colors group-hover:text-sky">
                  {n.label}
                </span>
                <span className="eyebrow tabular-nums text-sky">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-auto pt-10">
          <a href={booking.href} onClick={() => close(false)} className="btn-primary min-h-14 w-full justify-between">
            {booking.label}
            <Arrow />
          </a>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-ivory/75">
            <address className="not-italic">
              {business.street}
              <br />
              {business.city}, {business.region} {business.postal}
            </address>
            <div className="flex flex-col items-start gap-1">
              <a href={business.phoneHref} className="link-underline">
                {business.phoneDisplay}
              </a>
              <a href={business.instagram.url} className="link-underline" target="_blank" rel="noopener noreferrer">
                Instagram {business.instagram.handle}
              </a>
              <a href={`mailto:${business.email}`} className="link-underline break-all">
                {business.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
