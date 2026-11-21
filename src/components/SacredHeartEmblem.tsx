import { cn } from '@/lib/utils'

interface SacredHeartEmblemProps {
  className?: string
  variant?: 'hero' | 'icon' | 'motif'
  decorative?: boolean
}

/**
 * Bespoke luminous Sacred Heart of Jesus emblem:
 * - Twelve-ray golden sunburst (Light)
 * - Heart encircled by a stylized Crown of Thorns (Mercy & Sacrifice)
 * - Living Flame of Love surmounted by the Cross
 */
export function SacredHeartEmblem({
  className,
  variant = 'hero',
  decorative = true,
}: SacredHeartEmblemProps) {
  const isIcon = variant === 'icon'

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden={decorative ? 'true' : undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Sacred Heart of Jesus emblem'}
      className={cn('block', className)}
    >
      <defs>
        <radialGradient id="sh-sunburst" cx="50%" cy="54%" r="50%">
          <stop offset="0%" stopColor="#fff7d6" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sh-heart" x1="72" y1="92" x2="168" y2="196" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff6b8b" />
          <stop offset="52%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <linearGradient id="sh-flame" x1="120" y1="36" x2="120" y2="106" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="45%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="sh-gold" x1="120" y1="14" x2="120" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Soft Radiant Glory Halo */}
      <circle cx="120" cy="128" r="108" fill="url(#sh-sunburst)" />

      {/* 12 Golden Glory Rays */}
      {!isIcon ? (
        <g stroke="url(#sh-gold)" strokeLinecap="round" opacity="0.85">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => {
            const rad = (deg * Math.PI) / 180
            const r1 = idx % 2 === 0 ? 58 : 66
            const r2 = idx % 2 === 0 ? 110 : 94
            const x1 = 120 + Math.cos(rad) * r1
            const y1 = 128 + Math.sin(rad) * r1
            const x2 = 120 + Math.cos(rad) * r2
            const y2 = 128 + Math.sin(rad) * r2
            return (
              <line
                key={deg}
                x1={x1.toFixed(1)}
                y1={y1.toFixed(1)}
                x2={x2.toFixed(1)}
                y2={y2.toFixed(1)}
                strokeWidth={idx % 2 === 0 ? '2' : '1.2'}
              />
            )
          })}
        </g>
      ) : null}

      {/* Luminous Concentric Glory Ring */}
      {!isIcon ? (
        <circle
          cx="120"
          cy="128"
          r="76"
          stroke="#fde68a"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      ) : null}

      {/* Living Flame of Love */}
      <path
        d="M120 40 C131 58 144 70 138 92 C134 103 126 108 120 110 C114 108 106 103 102 92 C96 70 109 58 120 40 Z"
        fill="url(#sh-flame)"
      />
      <path
        d="M120 56 C126 68 132 76 129 90 C127 96 123 100 120 102 C117 100 113 96 111 90 C108 76 114 68 120 56 Z"
        fill="#fffbeb"
        opacity="0.82"
      />

      {/* Radiant Cross Rising from the Flame */}
      <g stroke="url(#sh-gold)" strokeLinecap="round">
        <line x1="120" y1="18" x2="120" y2="74" strokeWidth={isIcon ? '7' : '4.5'} />
        <line x1="100" y1="36" x2="140" y2="36" strokeWidth={isIcon ? '7' : '4.5'} />
      </g>

      {/* The Sacred Heart */}
      <path
        d="M120 198 C120 198 68 164 68 123 C68 103 83 90 100 90 C110 90 116 95 120 102 C124 95 130 90 140 90 C157 90 172 103 172 123 C172 164 120 198 120 198 Z"
        fill="url(#sh-heart)"
        stroke="#fff7ed"
        strokeOpacity="0.72"
        strokeWidth={isIcon ? '4' : '2.2'}
      />

      {/* Specular Inner Light Highlight on Heart */}
      <path
        d="M84 118 C84 108 92 101 101 101"
        stroke="#fff1f2"
        strokeOpacity="0.65"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Stylized Gilded Crown of Thorns Encircling the Heart */}
      <path
        d="M64 132 C84 146 156 146 176 132"
        stroke="#fde68a"
        strokeWidth={isIcon ? '5' : '2.6'}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M67 139 C89 151 151 151 173 139"
        stroke="#f59e0b"
        strokeWidth={isIcon ? '3.5' : '1.8'}
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {!isIcon ? (
        <g stroke="#fffbeb" strokeWidth="1.7" strokeLinecap="round">
          <line x1="86" y1="141" x2="82" y2="132" />
          <line x1="108" y1="145" x2="113" y2="136" />
          <line x1="132" y1="145" x2="127" y2="136" />
          <line x1="154" y1="141" x2="158" y2="132" />
        </g>
      ) : null}

      {/* Pierced Light Mark */}
      {!isIcon ? (
        <path
          d="M144 152 L152 160"
          stroke="#fff7ed"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.9"
        />
      ) : null}
    </svg>
  )
}
