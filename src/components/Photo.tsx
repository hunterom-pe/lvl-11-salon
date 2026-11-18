import type { CSSProperties } from 'react'
import { photos, type PhotoKey } from '../content/photos'
import dims from '../content/photo-dims.json'

type Dims = Record<string, { w: number; h: number; lqip?: string }>

type Props = {
  name: PhotoKey
  /** `sizes` attribute: describe the rendered width so the browser picks well */
  sizes: string
  className?: string
  imgClassName?: string
  priority?: boolean
  /** Override object-position */
  focus?: string
  style?: CSSProperties
}

const srcset = (key: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/${key}-${w}.${ext} ${w}w`).join(', ')

/**
 * Responsive, art-directable photo: AVIF → WebP, intrinsic size to prevent
 * layout shift, blurred placeholder while loading. Fills its container
 * (object-cover), so the parent controls aspect ratio and crop.
 */
export function Photo({ name, sizes, className = '', imgClassName = '', priority, focus, style }: Props) {
  const p = photos[name]
  const d = (dims as Dims)[name]
  const fallback = `/images/${p.key}-${p.widths[Math.min(2, p.widths.length - 1)]}.webp`
  const pos = focus ?? p.focus ?? '50% 50%'
  return (
    <picture
      className={`block overflow-hidden bg-paper ${className}`}
      style={{
        backgroundImage: d?.lqip ? `url(${d.lqip})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: pos,
        ...style,
      }}
    >
      <source type="image/avif" srcSet={srcset(p.key, p.widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(p.key, p.widths, 'webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={p.alt}
        width={d?.w}
        height={d?.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ objectPosition: pos }}
      />
    </picture>
  )
}
