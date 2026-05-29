import { useCallback, useEffect, useState, type MouseEvent } from 'react'
import { AnimatedMesh } from './components/AnimatedMesh'
import { BackToTop } from './components/BackToTop'
import { Magnetic } from './components/Magnetic'
import { ParticleField } from './components/ParticleField'
import { Reveal } from './components/Reveal'
import { ScrollProgress } from './components/ScrollProgress'
import { TextReveal } from './components/TextReveal'
import { TiltCard } from './components/TiltCard'
import { useIsMobile } from './hooks/useIsMobile'
import { useLenis } from './hooks/useLenis'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useScrollHeader } from './hooks/useScrollHeader'
import { useScrollSpy } from './hooks/useScrollSpy'
import './App.css'
import './tech.css'
import './mobile.css'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85'

const stats = [
  { value: 'Family', label: 'Owned & operated' },
  { value: 'Florida', label: 'Statewide focus' },
  { value: 'Long-term', label: 'Portfolio hold' },
] as const

const steps = [
  {
    num: '01',
    title: 'Acquire',
    body: 'We purchase residential and investment properties across Florida — including as-is.',
    Icon: IconHouseDollar,
  },
  {
    num: '02',
    title: 'Refurbish',
    body: 'Each property is thoughtfully renovated to a high standard by our family team.',
    Icon: IconBuilding,
  },
  {
    num: '03',
    title: 'Hold & Rent',
    body: 'Every property stays in our portfolio. Some we rent out; none are sold on the open market.',
    Icon: IconCheck,
  },
] as const

const reasons = [
  {
    title: 'Family-Owned',
    body: 'Long-term decisions and personal accountability on every property.',
    Icon: IconHandshake,
  },
  {
    title: 'We Buy As-Is',
    body: 'Any condition — no repairs or agent commissions required from sellers.',
    Icon: IconHouseDollar,
  },
  {
    title: 'Quality Refurbishment',
    body: 'In-house renovations to a high standard before a home joins the portfolio.',
    Icon: IconBuilding,
  },
  {
    title: 'Hold & Rent',
    body: 'Properties stay ours. Some are rented out; none are sold on the open market.',
    Icon: IconKey,
  },
] as const

const navLinks = [
  { href: '#top', label: 'Home' },
  { href: '#how-it-works', label: 'What We Do' },
  { href: '#why-us', label: 'Why JESMAC' },
] as const

const CONTACT_EMAIL = 'info@jesmacfamilyventures.com'

const sectionIds = navLinks.map((l) => l.href)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const headerScrolled = useScrollHeader()
  const activeSection = useScrollSpy(sectionIds)
  const enableSmoothScroll = !reducedMotion && !isMobile
  const { scrollTo, lenisRef, ready: lenisReady } = useLenis(enableSmoothScroll)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        scrollTo(href)
      }
      closeMenu()
    },
    [scrollTo],
  )

  return (
    <div className="site">
      <div className="site__grain" aria-hidden="true" />
      <ScrollProgress lenisRef={lenisRef} lenisReady={lenisReady || isMobile} />
      <BackToTop lenisRef={lenisRef} lenisReady={lenisReady || isMobile} />

      <header className={`header ${headerScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner container">
          <a className="brand" href="#top" onClick={(e) => handleNavClick(e, '#top')}>
            <img
              className="brand__mark"
              src="/jesmac-logo.png"
              width={200}
              height={80}
              alt="JESMAC Family Ventures LLC"
              decoding="async"
            />
          </a>

          <nav className="nav nav--desktop" aria-label="Primary">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                className={`nav__link ${activeSection === href ? 'nav__link--active' : ''}`}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            ))}
          </nav>

          <Magnetic className="header__cta-wrap header__cta--desktop">
            <a className="btn btn--gold btn--sm" href={`mailto:${CONTACT_EMAIL}`}>
              Contact Us
            </a>
          </Magnetic>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`nav-mobile ${menuOpen ? 'nav-mobile--open' : ''}`}
          aria-hidden={!menuOpen}
          {...(!menuOpen ? { inert: true } : {})}
        >
          <nav aria-label="Mobile">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={(e) => handleNavClick(e, href)}>
                {label}
              </a>
            ))}
            <a className="btn btn--gold nav-mobile__cta" href={`mailto:${CONTACT_EMAIL}`}>
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <div className="hero__bg">
            <img src={HERO_IMAGE} alt="" width={2400} height={1600} fetchPriority="high" />
            <AnimatedMesh />
            <ParticleField />
            <div className="hero__overlay" />
          </div>

          <div className="hero__content container">
            <div className="hero__copy">
              <TextReveal
                id="hero-heading"
                className="hero__title"
                lines={['Family real estate', 'across Florida.']}
                accentIndex={1}
              />
              <p className="hero__sub">
                We buy properties, refurbish them in-house, and keep them in our portfolio for the
                long term. Some homes are rented out — we never sell on the open market.
              </p>
              <div className="hero__actions">
                <Magnetic>
                  <a className="btn btn--gold" href={`mailto:${CONTACT_EMAIL}`}>
                    Start a conversation
                    <IconArrow />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    className="btn btn--ghost"
                    href="#how-it-works"
                    onClick={(e) => handleNavClick(e, '#how-it-works')}
                  >
                    Our approach
                  </a>
                </Magnetic>
              </div>
            </div>

            <ul className="hero__stats" aria-label="Highlights">
              {stats.map(({ value, label }) => (
                <li key={label} className="hero__stat">
                  <span className="hero__stat-value">{value}</span>
                  <span className="hero__stat-label">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="hero__disclaimer container">Illustrative photography — not an active listing.</p>

          {!reducedMotion && !isMobile ? (
            <div className="scroll-hint" aria-hidden="true">
              <span className="scroll-hint__line" />
              Scroll
            </div>
          ) : null}
        </section>

        <section className="section section--process" id="how-it-works" aria-labelledby="how-heading">
          <div className="container">
            <Reveal>
              <header className="section-head">
                <span className="section-head__eyebrow">Our process</span>
                <h2 className="section-head__title" id="how-heading">
                  What We Do
                </h2>
                <p className="section-head__lede">
                  A disciplined, end-to-end model — from acquisition through refurbishment to
                  long-term ownership.
                </p>
              </header>
            </Reveal>

            <ol className="process-grid">
              {steps.map(({ num, title, body, Icon }, i) => (
                <li key={title}>
                  <Reveal delay={i * 80} className="reveal--fill">
                    <TiltCard>
                      <article className="process-card">
                        <span className="process-card__num" aria-hidden="true">
                          {num}
                        </span>
                        <div className="process-card__icon" aria-hidden="true">
                          <Icon />
                        </div>
                        <h3 className="process-card__title">{title}</h3>
                        <p className="process-card__body">{body}</p>
                      </article>
                    </TiltCard>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--premium" id="why-us" aria-labelledby="why-heading">
          <div className="section--premium__bg" aria-hidden="true" />
          <div className="container">
            <Reveal>
              <header className="section-head section-head--light">
                <span className="section-head__eyebrow">Why partner with us</span>
                <h2 className="section-head__title" id="why-heading">
                  Why JESMAC?
                </h2>
                <p className="section-head__lede">
                  A family business across Florida — we buy well, renovate with care, and hold
                  properties for the long term.
                </p>
              </header>
            </Reveal>

            <ul className="card-grid card-grid--4">
              {reasons.map(({ title, body, Icon }, i) => (
                <li key={title}>
                  <Reveal delay={i * 60} className="reveal--fill">
                    <TiltCard>
                      <article className="card card--glass">
                        <div className="card__icon" aria-hidden="true">
                          <Icon />
                        </div>
                        <h3 className="card__title">{title}</h3>
                        <p className="card__body">{body}</p>
                      </article>
                    </TiltCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <img
              className="footer__logo"
              src="/jesmac-logo.png"
              alt=""
              width={160}
              height={64}
              decoding="async"
            />
            <p className="footer__tagline">
              Family real estate — acquire, refurbish, and hold across Florida.
            </p>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={(e) => handleNavClick(e, href)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="footer__meta">
            <p className="footer__name">JESMAC Family Ventures LLC</p>
            <p className="footer__rights">
              © {new Date().getFullYear()} JESMAC Family Ventures LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {menuOpen ? (
        <button
          type="button"
          className="nav__scrim"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closeMenu}
        />
      ) : null}
    </div>
  )
}

function IconArrow() {
  return (
    <svg className="icon-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconHandshake() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v6a7.5 7.5 0 0015 0v-6a1.5 1.5 0 00-3 0m-9-1.5V14"
      />
    </svg>
  )
}

function IconHouseDollar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  )
}

function IconKey() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
      />
    </svg>
  )
}
