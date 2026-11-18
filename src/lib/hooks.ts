import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

/** Sets data-inview="true" on the element the first time it scrolls into view. */
export function useInView<T extends HTMLElement>(options: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<T>(null)
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.inview = 'true'
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.inview = 'true'
            io.unobserve(e.target)
          }
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])
  return ref
}

const motionQuery = '(prefers-reduced-motion: reduce)'
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(motionQuery)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(motionQuery).matches,
    () => false,
  )
}

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
