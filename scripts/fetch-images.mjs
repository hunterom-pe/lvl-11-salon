/**
 * Downloads every Unsplash-sourced entry in src/content/photos.ts once at full
 * size, then writes optimised AVIF + WebP renditions to /public/images and
 * intrinsic dimensions to src/content/photo-dims.json.
 *
 *   npm run images          # skip files that already exist
 *   npm run images -- -f    # force re-download / re-encode
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { photos } from '../src/content/photos.ts'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public/images')
const cacheDir = path.join(root, '.image-cache')
const force = process.argv.includes('-f')
await mkdir(outDir, { recursive: true })
await mkdir(cacheDir, { recursive: true })

const exists = (p) => access(p).then(() => true, () => false)
const dims = {}

for (const photo of Object.values(photos)) {
  if (!photo.unsplash) continue
  const src = path.join(cacheDir, `${photo.key}.jpg`)
  if (force || !(await exists(src))) {
    const url = `https://images.unsplash.com/${photo.unsplash}?w=2600&q=90&fm=jpg`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`${photo.key}: ${res.status}`)
    await writeFile(src, Buffer.from(await res.arrayBuffer()))
  }
  const buf = await readFile(src)
  const meta = await sharp(buf).metadata()
  dims[photo.key] = { w: meta.width, h: meta.height }
  for (const w of photo.widths) {
    const width = Math.min(w, meta.width)
    const base = path.join(outDir, `${photo.key}-${w}`)
    if (!force && (await exists(base + '.webp'))) continue
    const img = sharp(buf).resize({ width, withoutEnlargement: true })
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(base + '.avif')
    await img.clone().webp({ quality: 74 }).toFile(base + '.webp')
  }
  // tiny blurred placeholder for progressive loading
  const lqip = await sharp(buf).resize(24).blur(1).webp({ quality: 40 }).toBuffer()
  dims[photo.key].lqip = `data:image/webp;base64,${lqip.toString('base64')}`
  console.log('✓', photo.key, meta.width, '×', meta.height)
}

await writeFile(path.join(root, 'src/content/photo-dims.json'), JSON.stringify(dims, null, 2) + '\n')
