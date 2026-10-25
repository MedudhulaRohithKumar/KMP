interface KmpBrandLogoProps {
  className?: string
  showTagline?: boolean
  variant?: 'full' | 'compact' | 'symbol'
  theme?: 'light' | 'dark'
  height?: number
}

export default function KmpBrandLogo({
  className = '',
  showTagline = true,
  variant = 'full',
  theme = 'light',
  height = 44,
}: KmpBrandLogoProps) {
  const isLight = theme === 'light' // Used on light frosted glass backgrounds (like the Navbar)

  if (variant === 'symbol') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`kmp-brand-symbol ${className}`}
        style={{ height: `${height}px`, width: `${height}px`, flexShrink: 0 }}
        aria-label="KMP Microgreens Emblem"
      >
        <defs>
          <linearGradient id="kmpGoldSym" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6E09E" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8C6B0D" />
          </linearGradient>
          <linearGradient id="kmpEmeraldSym" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67FF9A" />
            <stop offset="60%" stopColor="#2CE67F" />
            <stop offset="100%" stopColor="#0B733B" />
          </linearGradient>
          <linearGradient id="kmpLeafGlowSym" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E824C" />
            <stop offset="100%" stopColor="#52F398" />
          </linearGradient>
          <radialGradient id="kmpGlowSym" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(44, 230, 127, 0.3)" />
            <stop offset="100%" stopColor="rgba(10, 26, 17, 0)" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#kmpGlowSym)" />
        <circle cx="50" cy="50" r="45" stroke="url(#kmpGoldSym)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="40" stroke="#2CE67F" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="3 3" />

        {/* Cotyledon Leaves */}
        <path
          d="M 50 68 C 44 56 32 50 26 38 C 22 30 28 20 38 22 C 46 24 49 34 50 46"
          fill="url(#kmpEmeraldSym)"
          stroke="url(#kmpGoldSym)"
          strokeWidth="1.2"
        />
        <path
          d="M 50 68 C 56 54 68 46 76 34 C 82 25 74 16 63 18 C 54 20 51 32 50 46"
          fill="url(#kmpLeafGlowSym)"
          stroke="url(#kmpGoldSym)"
          strokeWidth="1.2"
        />
        <path d="M 50 78 C 50 64 49.5 52 50 46" stroke="url(#kmpGoldSym)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="80" r="4" fill="url(#kmpGoldSym)" />
        <circle cx="34" cy="27" r="2.2" fill="#FFFFFF" />
        <circle cx="68" cy="24" r="1.8" fill="#FFFFFF" />
      </svg>
    )
  }

  return (
    <div className={`kmp-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: `${height}px`, width: `${height}px`, flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`kmpGold-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLight ? '#9A7B1C' : '#FCEBB6'} />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor={isLight ? '#7A5B0B' : '#AA820A'} />
          </linearGradient>
          <linearGradient id={`kmpEmerald-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#48EB8D" />
            <stop offset="60%" stopColor="#1E824C" />
            <stop offset="100%" stopColor="#0B301D" />
          </linearGradient>
          <linearGradient id={`kmpLeaf-${theme}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#125830" />
            <stop offset="100%" stopColor="#3CD675" />
          </linearGradient>
          <radialGradient id={`kmpBadgeGlow-${theme}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isLight ? 'rgba(30, 130, 76, 0.15)' : 'rgba(44, 230, 127, 0.3)'} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill={`url(#kmpBadgeGlow-${theme})`} />
        <circle cx="50" cy="50" r="45" stroke={`url(#kmpGold-${theme})`} strokeWidth="1.5" />
        <circle cx="50" cy="50" r="40" stroke={isLight ? '#1E824C' : '#2CE67F'} strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="3 2" />

        {/* Leaves */}
        <path
          d="M 50 67 C 44 55 33 50 27 38 C 23 29 29 19 40 21 C 48 23 50 33 50 46"
          fill={`url(#kmpEmerald-${theme})`}
          stroke={`url(#kmpGold-${theme})`}
          strokeWidth="1.2"
        />
        <path
          d="M 50 67 C 56 53 67 46 75 34 C 81 25 73 16 62 18 C 53 20 50 32 50 46"
          fill={`url(#kmpLeaf-${theme})`}
          stroke={`url(#kmpGold-${theme})`}
          strokeWidth="1.2"
        />
        {/* Veins */}
        <path d="M 50 46 Q 37 34 32 28" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.8" fill="none" />
        <path d="M 50 46 Q 63 32 69 25" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.8" fill="none" />
        {/* Hypocotyl Stem */}
        <path d="M 50 78 C 50 65 49.5 54 50 46" stroke={`url(#kmpGold-${theme})`} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="79" r="4" fill={`url(#kmpGold-${theme})`} />
        <circle cx="34" cy="27" r="2.2" fill="#FFFFFF" />
        <circle cx="68" cy="24" r="1.8" fill="#FFFFFF" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: `${Math.round(height * 0.52)}px`,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: isLight ? '#072414' : '#FFFFFF',
              textShadow: isLight ? 'none' : '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            KMP
          </span>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: `${Math.max(10, Math.round(height * 0.22))}px`,
              fontWeight: 800,
              letterSpacing: '0.2em',
              color: isLight ? '#9A7B1C' : '#D4AF37',
              textTransform: 'uppercase',
            }}
          >
            Microgreens
          </span>
        </div>

        {showTagline && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: `${Math.max(8, Math.round(height * 0.16))}px`,
              letterSpacing: '0.12em',
              color: isLight ? 'rgba(7, 36, 20, 0.7)' : 'rgba(255, 255, 255, 0.65)',
              textTransform: 'uppercase',
              marginTop: '1px',
            }}
          >
            Nature's Small Greens · Big Nutrition
          </span>
        )}
      </div>
    </div>
  )
}
