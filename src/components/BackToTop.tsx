import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type Lenis from 'lenis'

type BackToTopProps = {
  lenisRef: RefObject<Lenis | null>
  lenisReady: boolean
}

export function BackToTop({ lenisRef, lenisReady }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    const lenis = lenisRef.current
    if (lenis && lenisReady) {
      lenis.on('scroll', onScroll)
      return () => lenis.off('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenisRef, lenisReady])

  const scrollUp = () => {
    lenisRef.current?.scrollTo('#top', { offset: 0 })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      aria-label="Back to top"
      onClick={scrollUp}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 4v12M5 9l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
