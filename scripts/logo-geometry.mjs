import { stroke } from './brush.mjs'

/**
 * LVL 11 wordmark geometry.
 * Coordinates live in a 1000 × 470 artboard: brush "LVL 11" on top,
 * wide-tracked monoline "SALON" underneath.
 */
export const VIEW = { w: 1010, h: 456 }

// Raw strokes are drawn upright, then sheared forward for momentum.
const SLANT = Math.tan((11 * Math.PI) / 180)
const BASE = 320
const shear = (pts, dy = 0) => pts.map(([x, y]) => [x + (BASE - y) * SLANT * 0.85 - 18, y + dy])

// { p: [p0, p1, p2, p3], w: width, seed, dry: where bristles separate, press: end pressure }
const RAW = [
  // L: loaded down-stroke, then a fast foot that kicks up and runs dry
  { p: [[96, 40], [92, 130], [86, 220], [80, 318]], w: 66, seed: 7, dry: 0.86, press: 0.96, lanes: 6 },
  { p: [[58, 302], [118, 306], [196, 300], [286, 252]], w: 52, seed: 12, dry: 0.42, press: 0.62, lanes: 7 },
  // V: committed diagonals; the up-stroke overshoots and frays
  { p: [[262, 52], [280, 140], [300, 232], [318, 324]], w: 62, seed: 23, dry: 0.86, lanes: 6 },
  { p: [[304, 322], [336, 226], [384, 118], [452, 14]], w: 56, seed: 17, dry: 0.5, press: 0.7, lanes: 8 },
  // L: sits a touch higher than the first, for bounce
  { p: [[496, 30], [492, 120], [486, 210], [478, 302]], w: 64, seed: 31, dry: 0.86, press: 0.95, lanes: 6, dy: 0 },
  { p: [[458, 288], [520, 292], [600, 286], [690, 236]], w: 50, seed: 36, dry: 0.42, press: 0.62, lanes: 7 },
  // 1: flag + stem
  { p: [[714, 116], [736, 96], [758, 72], [790, 38]], w: 40, seed: 41, dry: 1, press: 0.8 },
  { p: [[796, 30], [792, 130], [786, 230], [778, 330]], w: 62, seed: 43, dry: 1, press: 0.86 },
  // 1: dropped slightly lower than its twin
  { p: [[856, 128], [878, 108], [900, 84], [932, 50]], w: 40, seed: 51, dry: 1, press: 0.8 },
  { p: [[938, 42], [934, 140], [928, 238], [920, 336]], w: 62, seed: 57, dry: 1, press: 0.84 },
]

const STROKES = RAW.map(({ dy, ...s }) => ({ ...s, p: shear(s.p, dy) }))

export function brushPath() {
  return STROKES.map((s) => stroke(s)).join('')
}

/** Monoline geometric capitals for SALON (stroked, not filled). */
export const SALON = (() => {
  const h = 46
  const sw = 7
  const track = 62 // generous tracking
  const glyphs = {
    S: { w: 36, d: `M33 8C28 1 6 0 5 12C4 24 33 20 33 33C33 46 8 47 2 38` },
    A: { w: 42, d: `M0 46L21 0L42 46M8 31H34` },
    L: { w: 30, d: `M3 0V43H30` },
    O: { w: 46, d: `M23 0C36 0 46 10 46 23C46 36 36 46 23 46C10 46 0 36 0 23C0 10 10 0 23 0Z` },
    N: { w: 38, d: `M3 46V0L35 46V0` },
  }
  const word = 'SALON'
  const total = [...word].reduce((a, c) => a + glyphs[c].w, 0) + track * (word.length - 1)
  // align SALON so it sits right-of-centre under the wordmark, ending under the second "1"
  const right = 908
  let x = right - total
  const parts = []
  const list = []
  for (const ch of word) {
    list.push({ x, d: glyphs[ch].d })
    parts.push(`<path transform="translate(${x} 394)" d="${glyphs[ch].d}"/>`)
    x += glyphs[ch].w + track
  }
  return { svg: parts.join(''), glyphs: list, stroke: sw, height: h, start: right - total, end: right }
})()

export function logoSVG({ color = '#292C2A', salonColor, title = 'LVL 11 Salon' } = {}) {
  const sc = salonColor ?? color
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW.w} ${VIEW.h}" role="img" aria-label="${title}"><title>${title}</title><path fill="${color}" d="${brushPath()}"/><g fill="none" stroke="${sc}" stroke-width="${SALON.stroke}" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="1.5">${SALON.svg}</g></svg>`
}

/** Simplified favicon mark: a loaded-brush "11" on a 64px tile. */
export function faviconPath() {
  const sh = (pts) => pts.map(([x, y]) => [x + (48 - y) * 0.14, y])
  return [
    stroke({ p: sh([[9, 22], [13, 18], [17, 14], [22, 9]]), w: 7.5, seed: 3, dry: 1, press: 0.8, rough: 0.6 }),
    stroke({ p: sh([[23, 7], [22.5, 22], [22, 38], [21, 55]]), w: 11, seed: 4, dry: 1, press: 0.9, rough: 0.6 }),
    stroke({ p: sh([[34, 22], [38, 18], [42, 14], [47, 9]]), w: 7.5, seed: 5, dry: 1, press: 0.8, rough: 0.6 }),
    stroke({ p: sh([[48, 7], [47.5, 22], [47, 38], [46, 55]]), w: 11, seed: 6, dry: 1, press: 0.9, rough: 0.6 }),
  ].join('')
}

/** Long dry-brush swash (1000 × 120), echoing the underline on the original sign. */
export function swashPath() {
  return stroke({ p: [[20, 92], [300, 70], [640, 52], [985, 26]], w: 34, seed: 99, dry: 0.55, press: 0.7, lanes: 9, samples: 80 })
}
