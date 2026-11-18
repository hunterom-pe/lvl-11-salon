import { hours } from '../content/site'

/** "17:00" → "5 pm", "09:30" → "9:30 am" */
export function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return m ? `${h12}:${String(m).padStart(2, '0')} ${suffix}` : `${h12} ${suffix}`
}

/** Current weekday index (0 = Monday) and minutes since midnight in Phoenix (no DST). */
export function phoenixNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Phoenix',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = hours.findIndex((h) => h.day === get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function openStatus(date = new Date()) {
  const { day, minutes } = phoenixNow(date)
  const today = hours[day]
  if (today?.open && today.close) {
    const o = toMin(today.open)
    const c = toMin(today.close)
    if (minutes >= o && minutes < c) return { day, open: true, label: `Open now · until ${fmtTime(today.close)}` }
    if (minutes < o) return { day, open: false, label: `Opens today at ${fmtTime(today.open)}` }
  }
  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7]
    if (next.open) {
      return { day, open: false, label: `Closed now · opens ${i === 1 ? 'tomorrow' : next.day} ${fmtTime(next.open)}` }
    }
  }
  return { day, open: false, label: 'Closed' }
}
