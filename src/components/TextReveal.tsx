import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type TextRevealProps = {
  id?: string
  lines: readonly string[]
  accentIndex?: number
  className?: string
}

export function TextReveal({ id, lines, accentIndex = 1, className = '' }: TextRevealProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <h1 id={id} className={className}>
        {lines.map((line, i) => (
          <span
            key={line}
            className={i === accentIndex ? 'hero__line hero__line--accent' : 'hero__line'}
          >
            {line}
          </span>
        ))}
      </h1>
    )
  }

  return (
    <h1 id={id} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, lineIndex) => (
        <span
          key={line}
          className={`hero__line ${lineIndex === accentIndex ? 'hero__line--accent' : ''}`}
          aria-hidden="true"
        >
          {line.split('').map((char, i) => (
            <span
              key={`${lineIndex}-${i}`}
              className="text-reveal__char"
              style={{ animationDelay: `${lineIndex * 0.35 + i * 0.028}s` }}
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
