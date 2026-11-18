import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { Ticker } from './sections/Ticker'
import { Services } from './sections/Services'
import { Experience } from './sections/Experience'
import { Work } from './sections/Work'
import { People } from './sections/People'
import { ClientLove } from './sections/ClientLove'
import { Visit } from './sections/Visit'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="btn-dark sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Ticker />
        <Services />
        <Experience />
        <Work />
        <People />
        <ClientLove />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
