/**
 * Procedural dry-brush stroke generator used to build the LVL 11 wordmark.
 *
 * Each stroke is a cubic Bézier centre-line. We sample it, apply a pressure
 * envelope + ragged edge noise, and split the tail into bristle "lanes" so the
 * end of every stroke breaks up like a loaded brush running dry.
 *
 * The output is plain, static SVG path data (no filters), so the mark renders
 * crisply everywhere: <img>, inline SVG, favicons, social cards.
 */

export function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function noise1(r, n) {
  const v = Array.from({ length: n + 1 }, () => r() * 2 - 1)
  return (t) => {
    const x = Math.min(Math.max(t, 0), 1) * n
    const i = Math.min(Math.floor(x), n - 1)
    const f = x - i
    const u = (1 - Math.cos(f * Math.PI)) / 2
    return v[i] * (1 - u) + v[i + 1] * u
  }
}

function bez([p0, p1, p2, p3], t) {
  const m = 1 - t
  const a = m * m * m, b = 3 * m * m * t, c = 3 * m * t * t, d = t * t * t
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]
}

function bezD([p0, p1, p2, p3], t) {
  const m = 1 - t
  const x = 3 * m * m * (p1[0] - p0[0]) + 6 * m * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0])
  const y = 3 * m * m * (p1[1] - p0[1]) + 6 * m * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1])
  const l = Math.hypot(x, y) || 1
  return [x / l, y / l]
}

const fmt = (n) => (Math.round(n * 10) / 10).toString()
const poly = (pts) => 'M' + pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join('L') + 'Z'

/**
 * @param {object} s
 * @param {number[][]} s.p        four control points
 * @param {number}     s.w        nominal brush width
 * @param {number}     s.seed
 * @param {number}    [s.dry=0.62] where the bristles start separating (1 = never)
 * @param {number}    [s.lanes=9]
 * @param {number}    [s.press=1] pressure multiplier at the end of the stroke
 * @param {number}    [s.rough=1] edge roughness multiplier
 */
export function stroke(s) {
  const r = rng(s.seed)
  const N = s.samples ?? 64
  const dry = s.dry ?? 0.62
  const lanes = s.lanes ?? 9
  const press = s.press ?? 1
  const rough = s.rough ?? 1
  const wobble = noise1(r, 5)
  const edgeL = noise1(r, 26)
  const edgeR = noise1(r, 26)
  const fine = noise1(r, 70)

  const width = (t) => {
    const attack = Math.min(1, 0.62 + t / 0.07 * 0.38)
    const body = 1 + (press - 1) * t
    return s.w * attack * body * (1 + 0.1 * wobble(t))
  }
  const at = (t) => {
    const c = bez(s.p, t)
    const [tx, ty] = bezD(s.p, t)
    return { c, n: [-ty, tx], tgt: [tx, ty] }
  }
  // offset across the brush: u in [-0.5, 0.5]
  const point = (t, u) => {
    const { c, n } = at(t)
    const w = width(t)
    // edges stay fairly clean in the loaded part of the stroke and roughen as it dries
    const dryness = Math.max(0, (t - dry * 0.7) / Math.max(1 - dry * 0.7, 0.01))
    const amp = rough * (0.025 + 0.06 * dryness)
    const jag = u < 0
      ? 1 + amp * edgeL(t) + rough * 0.012 * fine(t)
      : 1 + amp * edgeR(t) + rough * 0.012 * fine(1 - t)
    const off = u * w * (Math.abs(u) > 0.45 ? jag : 1)
    return [c[0] + n[0] * off, c[1] + n[1] * off]
  }

  const paths = []
  const bodyEnd = dry >= 1 ? 1 : dry + 0.06
  const steps = Math.ceil(N * bodyEnd)

  // body ribbon with a rough, slightly angled start cap
  const left = [], right = []
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * bodyEnd
    left.push(point(t, -0.5))
    right.push(point(t, 0.5))
  }
  const cap = []
  const { c: c0, tgt: g0, n: n0 } = at(0)
  const w0 = width(0)
  for (let k = 1; k < 6; k++) {
    const u = 0.5 - k / 6
    const back = (0.18 + 0.12 * r()) * w0 * Math.cos(u * Math.PI) - 0.12 * w0 * u
    cap.push([c0[0] + n0[0] * u * w0 - g0[0] * back, c0[1] + n0[1] * u * w0 - g0[1] * back])
  }
  if (dry >= 1) {
    // clean taper end
    const tip = at(1)
    const wt = width(1)
    right.push([tip.c[0] + tip.tgt[0] * wt * 0.25, tip.c[1] + tip.tgt[1] * wt * 0.25])
  }
  paths.push(poly([...left, ...right.reverse(), ...cap]))

  // dry-brush bristle lanes: random-width clumps that separate and run out
  if (dry < 1) {
    const cuts = [-0.5, 0.5]
    for (let i = 1; i < lanes; i++) cuts.push(-0.5 + (i + (r() - 0.5) * 0.8) / lanes)
    cuts.sort((a, b) => a - b)
    for (let i = 0; i < cuts.length - 1; i++) {
      const a0 = cuts[i]
      const b0 = cuts[i + 1]
      const centre = (a0 + b0) / 2
      const edge = Math.abs(centre) * 2
      const span = 1 - dry
      const end = Math.min(1, dry + span * (0.35 + r() * 0.65) * (1 - 0.25 * edge))
      const gap = 0.012 + r() * 0.03
      const la = [], lb = []
      const n = 16
      for (let k = 0; k <= n; k++) {
        const t = dry + ((end - dry) * k) / n
        const prog = k / n
        const split = Math.min(1, prog * 2) * gap
        const taper = 1 - Math.pow(prog, 1.8) * 0.92
        const half = Math.max(((b0 - a0) / 2) * taper - split, 0.004)
        la.push(point(t, centre - half))
        lb.push(point(t, centre + half))
      }
      paths.push(poly([...la, ...lb.reverse()]))
    }
  }
  return paths.join('')
}

/** Small irregular flecks thrown off the end of a stroke. */
export function flecks(seed, cx, cy, spread, count, size) {
  const r = rng(seed)
  let d = ''
  for (let i = 0; i < count; i++) {
    const x = cx + (r() - 0.5) * spread
    const y = cy + (r() - 0.5) * spread * 0.6
    const s = size * (0.4 + r())
    const pts = []
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2
      const rr = s * (0.6 + r() * 0.5)
      pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.7])
    }
    d += poly(pts)
  }
  return d
}
