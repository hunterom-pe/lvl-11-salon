import { BRUSH_D, LOGO_VIEW, SALON_GLYPHS, SALON_STROKE, SWASH_D } from '../brand/logo-data'

type Props = {
  /** Show the SALON line beneath the brush wordmark */
  withSalon?: boolean
  className?: string
  title?: string
  /** decorative = aria-hidden (when a visible/sr label exists nearby) */
  decorative?: boolean
}

/**
 * The LVL 11 wordmark. Colour comes from `currentColor`, so the same component
 * works on light and dark backgrounds (`text-charcoal` / `text-ivory`).
 */
export function Logo({ withSalon = true, className, title = 'LVL 11 Salon', decorative }: Props) {
  const h = withSalon ? LOGO_VIEW.h : 360
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEW.w} ${h}`}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <path fill="currentColor" d={BRUSH_D} />
      {withSalon && (
        <g fill="none" stroke="currentColor" strokeWidth={SALON_STROKE} strokeLinecap="square" strokeMiterlimit={1.5}>
          {SALON_GLYPHS.map((g) => (
            <path key={g.x} transform={`translate(${g.x} 394)`} d={g.d} />
          ))}
        </g>
      )}
    </svg>
  )
}

/** A long dry-brush stroke, used as an underline / divider accent. */
export function Swash({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 1010 120" className={className} style={style} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path fill="currentColor" d={SWASH_D} />
    </svg>
  )
}

/** Hand-cut arrow (not an icon-font glyph). */
export function Arrow({ className = 'arrow w-5 h-3', dir = 'right' }: { className?: string; dir?: 'right' | 'up-right' }) {
  return (
    <svg
      viewBox="0 0 24 14"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={dir === 'up-right' ? { transform: 'rotate(-45deg)' } : undefined}
    >
      <path d="M0 7h22M16 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
