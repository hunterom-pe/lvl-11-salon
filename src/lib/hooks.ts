import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

/**
 * Sets data-inview="true" on the element the first time it is on screen, which
 * plays its entrance animation. Content is visible without this (CSS only hides
 * it under html.motion), so a missed callback can never blank a section.
 *
 * Anything already in or above the viewport when it mounts (reload of /#work,
 * anchor jumps, back/forward restores, fast scrolling) is revealed at once.
 */
export function useInView<T extends HTMLElement>(options: { rootMargin?: string } = {}) {
  const ref = useRef<T>(null)
  const { rootMargin = '0px 0px -6% 0px' } = options
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = (t: HTMLElement) => {
      t.dataset.inview = 'true'
    }
    if (!document.documentElement.classList.contains('motion') || !('IntersectionObserver' in window)) {
      show(el)
      return
    }
    if (el.getBoundingClientRect().top < window.innerHeight) {
      // next frame, so the transition still plays for content that is on screen
      const raf = requestAnimationFrame(() => show(el))
      return () => cancelAnimationFrame(raf)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // reveal on entry, and also if a fast scroll/jump carried it past the top
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            show(e.target as HTMLElement)
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return ref
}

/**
 * The page is rendered client-side, so on a reload of /#work the browser looks
 * for #work before it exists and stays at the top. Re-apply the hash once the
 * sections are mounted (and again after webfonts settle the layout).
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    const raf = requestAnimationFrame(go)
    let cancelled = false
    document.fonts?.ready.then(() => !cancelled && go())
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [])
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/** Scroll position past a threshold (rAF-throttled). */
export function useScrolledPast(px: number) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      setPast(window.scrollY > px)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [px])
  return past
}
