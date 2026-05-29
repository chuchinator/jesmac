import Lenis from 'lenis'
import { useCallback, useEffect, useRef, useState } from 'react'

const HEADER_OFFSET = -72

export function useLenis(enabled: boolean) {
  const lenisRef = useRef<Lenis | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setReady(false)
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis
    setReady(true)

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      setReady(false)
    }
  }, [enabled])

  const scrollTo = useCallback((target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: HEADER_OFFSET })
      return
    }
    const el = document.querySelector(target)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }, [])

  return { scrollTo, lenisRef, ready }
}
