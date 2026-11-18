import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../lib/hooks'

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'fade' | 'image' | 'lines'
  id?: string
}

/** Wraps content in a scroll-triggered entrance (disabled under reduced motion via CSS). */
export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, variant = 'fade', id }: Props) {
  const ref = useInView<HTMLElement>()
  const cls = variant === 'image' ? 'reveal-img' : variant === 'fade' ? 'reveal' : ''
  return (
    <Tag ref={ref} id={id} className={`${cls} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}

/** One masked line of a headline; use inside <Reveal variant="lines">. */
export function Line({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`line-mask ${className}`}>
      <span style={{ '--delay': `${delay}ms` } as CSSProperties}>{children}</span>
    </span>
  )
}

/** Section eyebrow, e.g. "01 / Services" */
export function Eyebrow({ index, children, className = '' }: { index: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="tabular-nums">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  )
}
