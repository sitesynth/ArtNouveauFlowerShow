/**
 * BotanicalPattern — tonal embossed Art Nouveau floral tile.
 * Same hue as the burgundy background, slightly lighter — creates
 * a debossed / pressed-velvet effect like the Studio Renée reference.
 */

interface Props {
  className?: string;
  baseColor?: string;   // bg colour, used for fills
  lineColor?: string;   // slightly lighter stroke
  glowColor?: string;   // highlight edge (even lighter)
  opacity?: number;
}

export function BotanicalPattern({
  className = 'absolute inset-0 w-full h-full pointer-events-none',
  baseColor  = '#1a080c',
  lineColor  = '#3e1622',
  glowColor  = '#5a2030',
  opacity    = 0.85,
}: Props) {
  const id = 'bp-' + Math.round(Math.random() * 1e6);

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          x="0" y="0"
          width="180" height="300"
          patternUnits="userSpaceOnUse"
        >
          {/* ── Background tile fill ── */}
          <rect width="180" height="300" fill={baseColor} />

          {/* ══════════════════════════════════════════
              LEFT TULIP  (x ≈ 30)
          ══════════════════════════════════════════ */}

          {/* Stem */}
          <path d="M30 300 C29 265 27 230 28 185 C29 145 30 100 32 55 C33 38 32 20 30 5"
            stroke={lineColor} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <path d="M30 300 C29.5 265 27.5 230 28.5 185 C29.5 145 30.5 100 32.5 55 C33.5 38 32.5 20 30.5 5"
            stroke={glowColor} strokeWidth="0.5" fill="none" opacity="0.5" strokeLinecap="round"/>

          {/* Left leaf — curls away from centre */}
          <path d="M28 195 C18 182 8 172 -2 175 C-8 177 -10 183 -5 188 C2 194 14 192 28 195Z"
            stroke={lineColor} strokeWidth="1.2" fill={lineColor} fillOpacity="0.25" strokeLinecap="round"/>
          <path d="M28 195 C16 182 4 174 -2 176"
            stroke={glowColor} strokeWidth="0.4" fill="none" opacity="0.45"/>

          {/* Right leaf */}
          <path d="M30 175 C42 162 55 156 62 160 C68 164 66 172 58 176 C48 180 36 176 30 175Z"
            stroke={lineColor} strokeWidth="1.2" fill={lineColor} fillOpacity="0.22" strokeLinecap="round"/>
          <path d="M30 175 C42 162 58 156 62 160"
            stroke={glowColor} strokeWidth="0.4" fill="none" opacity="0.45"/>

          {/* Small left bud-leaf lower */}
          <path d="M29 235 C18 224 10 220 6 224 C3 228 6 234 14 236 C20 238 26 237 29 235Z"
            stroke={lineColor} strokeWidth="1" fill={lineColor} fillOpacity="0.18"/>

          {/* Tulip head — three petals */}
          <path d="M30 5 C22 12 19 26 22 36 C25 44 30 46 30 46 C30 46 35 44 38 36 C41 26 38 12 30 5Z"
            stroke={lineColor} strokeWidth="1.4" fill={lineColor} fillOpacity="0.30"/>
          {/* Centre petal ridge */}
          <path d="M30 8 C30 22 30 36 30 46"
            stroke={glowColor} strokeWidth="0.5" fill="none" opacity="0.55"/>
          {/* Left petal */}
          <path d="M30 10 C22 15 18 28 21 38"
            stroke={lineColor} strokeWidth="0.8" fill="none" opacity="0.60"/>
          {/* Right petal */}
          <path d="M30 10 C38 15 42 28 39 38"
            stroke={lineColor} strokeWidth="0.8" fill="none" opacity="0.60"/>
          {/* Sepal at base */}
          <path d="M24 44 C27 50 30 52 33 50 C36 48 36 44 30 46 C24 48 24 44 24 44Z"
            stroke={lineColor} strokeWidth="0.9" fill={lineColor} fillOpacity="0.20"/>


          {/* ══════════════════════════════════════════
              CENTRAL ALLIUM  (x = 90)
          ══════════════════════════════════════════ */}

          {/* Stem — tall, barely curved */}
          <path d="M90 300 C89 260 89 210 90 160 C91 110 90 65 90 15"
            stroke={lineColor} strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <path d="M90 300 C90 260 90 210 91 160 C92 110 91 65 91 15"
            stroke={glowColor} strokeWidth="0.6" fill="none" opacity="0.55" strokeLinecap="round"/>

          {/* Long left leaf — sweeps out dramatically */}
          <path d="M90 200 C72 178 54 168 40 172 C30 175 28 184 36 190 C48 196 68 192 90 200Z"
            stroke={lineColor} strokeWidth="1.3" fill={lineColor} fillOpacity="0.22"/>
          <path d="M90 200 C70 178 50 168 36 173"
            stroke={glowColor} strokeWidth="0.45" fill="none" opacity="0.50"/>

          {/* Long right leaf */}
          <path d="M90 185 C108 163 126 155 140 158 C150 161 152 170 144 176 C132 182 110 180 90 185Z"
            stroke={lineColor} strokeWidth="1.3" fill={lineColor} fillOpacity="0.22"/>
          <path d="M90 185 C110 163 130 155 144 160"
            stroke={glowColor} strokeWidth="0.45" fill="none" opacity="0.50"/>

          {/* Lower leaf pair */}
          <path d="M90 245 C76 232 64 228 58 232 C53 236 56 243 64 246 C74 249 84 247 90 245Z"
            stroke={lineColor} strokeWidth="1" fill={lineColor} fillOpacity="0.18"/>
          <path d="M90 240 C104 227 116 223 122 227 C127 231 124 238 116 241 C106 244 96 242 90 240Z"
            stroke={lineColor} strokeWidth="1" fill={lineColor} fillOpacity="0.18"/>

          {/* Allium / agapanthus round head */}
          <circle cx="90" cy="14" r="13"
            stroke={lineColor} strokeWidth="1.4" fill={lineColor} fillOpacity="0.15"/>
          {/* Radiating floret lines */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 90 + Math.cos(rad) * 6;
            const y1 = 14 + Math.sin(rad) * 6;
            const x2 = 90 + Math.cos(rad) * 13;
            const y2 = 14 + Math.sin(rad) * 13;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={glowColor} strokeWidth="0.7" opacity="0.55"/>
            );
          })}
          {/* Tiny floret dots */}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 90 + Math.cos(rad) * 13;
            const cy = 14 + Math.sin(rad) * 13;
            return <circle key={i} cx={cx} cy={cy} r="1.5" fill={glowColor} opacity="0.65"/>;
          })}
          {/* Centre dot */}
          <circle cx="90" cy="14" r="3" fill={glowColor} opacity="0.5"/>


          {/* ══════════════════════════════════════════
              RIGHT TULIP  (x = 150)
          ══════════════════════════════════════════ */}

          {/* Stem */}
          <path d="M150 300 C151 265 153 230 152 185 C151 145 150 100 148 55 C147 38 148 20 150 5"
            stroke={lineColor} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <path d="M150 300 C150.5 265 152.5 230 151.5 185 C150.5 145 149.5 100 147.5 55 C146.5 38 147.5 20 149.5 5"
            stroke={glowColor} strokeWidth="0.5" fill="none" opacity="0.5" strokeLinecap="round"/>

          {/* Left leaf */}
          <path d="M150 175 C138 162 125 156 118 160 C112 164 114 172 122 176 C132 180 144 176 150 175Z"
            stroke={lineColor} strokeWidth="1.2" fill={lineColor} fillOpacity="0.22"/>
          <path d="M150 175 C138 162 122 156 118 160"
            stroke={glowColor} strokeWidth="0.4" fill="none" opacity="0.45"/>

          {/* Right leaf — curls off tile edge */}
          <path d="M152 195 C162 182 172 172 182 175 C188 177 190 183 185 188 C178 194 166 192 152 195Z"
            stroke={lineColor} strokeWidth="1.2" fill={lineColor} fillOpacity="0.25"/>
          <path d="M152 195 C164 182 176 174 182 176"
            stroke={glowColor} strokeWidth="0.4" fill="none" opacity="0.45"/>

          {/* Small right bud-leaf lower */}
          <path d="M151 235 C162 224 170 220 174 224 C177 228 174 234 166 236 C160 238 154 237 151 235Z"
            stroke={lineColor} strokeWidth="1" fill={lineColor} fillOpacity="0.18"/>

          {/* Tulip head */}
          <path d="M150 5 C142 12 139 26 142 36 C145 44 150 46 150 46 C150 46 155 44 158 36 C161 26 158 12 150 5Z"
            stroke={lineColor} strokeWidth="1.4" fill={lineColor} fillOpacity="0.30"/>
          <path d="M150 8 C150 22 150 36 150 46"
            stroke={glowColor} strokeWidth="0.5" fill="none" opacity="0.55"/>
          <path d="M150 10 C142 15 138 28 141 38"
            stroke={lineColor} strokeWidth="0.8" fill="none" opacity="0.60"/>
          <path d="M150 10 C158 15 162 28 159 38"
            stroke={lineColor} strokeWidth="0.8" fill="none" opacity="0.60"/>
          <path d="M144 44 C147 50 150 52 153 50 C156 48 156 44 150 46 C144 48 144 44 144 44Z"
            stroke={lineColor} strokeWidth="0.9" fill={lineColor} fillOpacity="0.20"/>

        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
