import { useIsTouchDevice } from '../hooks/useIsTouchDevice'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useRef, type MouseEvent, type ReactNode } from 'react'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '', strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const touch = useIsTouchDevice()

  if (reduced || touch) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
