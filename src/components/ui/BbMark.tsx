interface BbMarkProps { size?: number; color?: string }

export function BbMark({ size = 28, color = 'var(--brand)' }: BbMarkProps) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} style={{ display: 'block' }} aria-label="Ben's Blinds logo">
      <rect x="2" y="2" width="36" height="36" rx="8" fill={color}/>
      <rect x="10" y="10" width="20" height="2.2" rx="1" fill="#fff"/>
      <rect x="10" y="14.5" width="20" height="2.2" rx="1" fill="#fff" opacity="0.85"/>
      <rect x="10" y="19" width="20" height="2.2" rx="1" fill="#fff" opacity="0.7"/>
      <rect x="10" y="23.5" width="20" height="2.2" rx="1" fill="#fff" opacity="0.55"/>
      <rect x="10" y="28" width="20" height="2.2" rx="1" fill="#fff" opacity="0.4"/>
      <polygon points="20,5.2 20.9,7.2 23.1,7.4 21.4,8.9 22,11 20,9.8 18,11 18.6,8.9 17,7.4 19.1,7.2" fill="#E2373B"/>
    </svg>
  )
}
