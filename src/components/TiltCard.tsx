import { useIsTouchDevice } from '../hooks/useIsTouchDevice'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useRef, type MouseEvent, type ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const touch = useIsTouchDevice()

  if (reduced || touch) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.setProperty('--tilt-x', `${y * -8}deg`)
    ref.current.style.setProperty('--tilt-y', `${x * 8}deg`)
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--tilt-x', '0deg')
    ref.current.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="tilt-card__shine" aria-hidden="true" />
      {children}
    </div>
  )
}
