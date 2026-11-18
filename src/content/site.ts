/**
 * SITE CONTENT: every word and fact on the page lives here.
 *
 * Verified = taken from lvl11phx.com (visible text or its schema.org data)
 * on 2026-11-17. Anything not verified is flagged in README.md.
 */
import type { PhotoKey } from './photos'

export const business = {
  name: 'LVL 11 Salon',
  street: '4626 N 16th St, Suite 104',
  city: 'Phoenix',
  region: 'AZ',
  postal: '85016',
  phoneDisplay: '(602) 975-6541',
  phoneHref: 'tel:+16029756541',
  email: 'lvl11phx@gmail.com',
  instagram: { handle: '@lvl11phx', url: 'https://www.instagram.com/lvl11phx' },
  geo: { lat: 33.505390598409804, lng: -112.0478217670837 },
  /** Walk-in policy, verbatim from the current site */
  walkIns: 'Walk-ins welcome, appointments preferred.',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('LVL 11 Salon, 4626 N 16th St Suite 104, Phoenix, AZ 85016'),
  /**
   * The salon's Google Maps listing, where reviews are read and written. Verified
   * 2026-11-17: this CID resolves to "LVL 11 Salon", 4626 N 16th St Ste 104,
   * (602) 975-6541, lvl11phx.com (feature id 0x872b139b07670ac3:0xc342c0dcf6e72b9d).
   * A direct "write a review" link needs the listing's Place ID, which couldn't be
   * verified, so the site links to the listing only.
   */
  googleListingUrl: 'https://www.google.com/maps?cid=14070020241126534045',
} as const

/**
 * Booking. Until LVL 11 confirms an online system, every booking CTA calls the salon.
 * Swap `href` for a booking URL later (and set `external: true`).
 */
export const booking = {
  href: business.phoneHref,
  external: false,
  /** Phone-based for now, so the wording says so. Change to 'Book online' etc. with a real booking URL. */
  label: 'Call to book',
  short: 'Call',
  hint: `Call ${business.phoneDisplay}`,
}

/**
 * Hours from the schema.org openingHoursSpecification on lvl11phx.com.
 * Sunday is listed as 00:00–00:00, which we read as closed. Confirm with the owners.
 * `null` = closed. 24h "HH:MM" strings.
 */
export const hours: { day: string; short: string; open: string | null; close: string | null }[] = [
  { day: 'Monday', short: 'Mon', open: '09:00', close: '17:00' },
  { day: 'Tuesday', short: 'Tue', open: '09:00', close: '19:00' },
  { day: 'Wednesday', short: 'Wed', open: '09:00', close: '21:00' },
  { day: 'Thursday', short: 'Thu', open: '09:00', close: '21:00' },
  { day: 'Friday', short: 'Fri', open: '09:00', close: '18:00' },
  { day: 'Saturday', short: 'Sat', open: '08:00', close: '17:00' },
  { day: 'Sunday', short: 'Sun', open: null, close: null },
]

export const nav = [
  { id: 'services', label: 'Services' },
  { id: 'salon', label: 'The Salon' },
  { id: 'work', label: 'Our Work' },
  { id: 'visit', label: 'Visit' },
] as const

export const services: { title: string; line: string; tags: string[]; photo: PhotoKey }[] = [
  {
    title: 'Cuts & Styling',
    line: 'Sharp lines, soft movement, and shapes built for how you actually wear your hair.',
    tags: ['Haircuts', 'Blowouts', 'Styling'],
    photo: 'cuts',
  },
  {
    title: 'Color & Blonding',
    line: 'Lived-in balayage, bright highlights, rich all-over color. Dimension that grows out beautifully.',
    tags: ['Balayage', 'Highlights', 'Color'],
    photo: 'color',
  },
  {
    title: 'Extensions',
    line: 'Length, density, or both, blended so seamlessly nobody has to know.',
    tags: ['Length', 'Volume', 'Blending'],
    photo: 'extensions',
  },
  {
    title: 'Treatments & Consultations',
    line: 'Start with a conversation. Leave with a plan, and healthier hair along the way.',
    tags: ['Consultations', 'Treatments', 'Hair health'],
    photo: 'treatments',
  },
]

/**
 * Portfolio grid, hand-composed for a 12-column × 8-row editorial layout on
 * large screens (`col` / `row` are CSS grid-column / grid-row values), and a
 * 2-column flow on mobile (`m`). The final 3×2 cell is an Instagram tile.
 */
export const work: { photo: PhotoKey; label: string; col: string; row: string; m: 'big' | 'wide' | 'tall' | 'std' }[] = [
  { photo: 'platinum', label: 'Platinum', col: '1 / 7', row: '1 / 4', m: 'big' },
  { photo: 'bob', label: 'The blunt bob', col: '7 / 10', row: '1 / 3', m: 'std' },
  { photo: 'pixie', label: 'Golden crop', col: '10 / 13', row: '1 / 3', m: 'std' },
  { photo: 'pink', label: 'Rose pink', col: '7 / 13', row: '3 / 5', m: 'wide' },
  { photo: 'silver', label: 'Silver & smoke', col: '1 / 4', row: '4 / 7', m: 'tall' },
  { photo: 'curls', label: 'Defined curls', col: '4 / 7', row: '4 / 6', m: 'std' },
  { photo: 'sea', label: 'Honey blonde', col: '7 / 13', row: '5 / 7', m: 'wide' },
  { photo: 'copper', label: 'Copper', col: '4 / 7', row: '6 / 9', m: 'tall' },
  { photo: 'lavender', label: 'Lavender', col: '1 / 4', row: '7 / 9', m: 'tall' },
  { photo: 'ginger', label: 'Length & shine', col: '7 / 10', row: '7 / 9', m: 'std' },
]

/**
 * STYLISTS: intentionally empty. Add only owner-approved people.
 *   { name, specialty, photo: '/images/team/jane-800.webp', bookingUrl?, instagram? }
 * When this array is empty the section shows a "lineup coming soon" state.
 */
export type Stylist = {
  name: string
  specialty: string
  photo: string
  bookingUrl?: string
  instagram?: string
}
export const stylists: Stylist[] = []

export const concept = {
  studio: 'Hunter Made',
  url: 'https://huntermade.studio',
  note: 'Independent design concept by Hunter Made. Not the official LVL 11 Salon website.',
}
