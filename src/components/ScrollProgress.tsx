import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type Lenis from 'lenis'
type ScrollProgressProps = {
  lenisRef: RefObject<Lenis | null>
  lenisReady: boolean
}

export function ScrollProgress({ lenisRef, lenisReady }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? el.scrollTop / max : 0)
    }

    update()
    const lenis = lenisRef.current
    if (lenis && lenisReady) {
      lenis.on('scroll', update)
      return () => lenis.off('scroll', update)
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [lenisRef, lenisReady])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ scale: `${progress} 1` }} />
    </div>
  )
}
