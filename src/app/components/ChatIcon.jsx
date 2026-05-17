export const ChatBotIcon = ({ size = 64, color = "var(--accent)" }) => (
  <div className="group w-fit relative">
    {/* Subtle halo - now using theme's glow effect */}
    <div
      className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700"
      style={{
        background: `radial-gradient(circle, ${color}20, transparent 70%)`,
        boxShadow: "var(--shadow-glow)",
      }}
    />

    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className="relative z-10 transition-transform duration-500 group-hover:scale-105"
    >
      <g transform="translate(12, 14)">
        {/* Head - using theme's matte metal gradient */}
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          rx="8"
          fill="url(#headGradient)"
          stroke="var(--border-light)"
          strokeWidth="1.5"
          className="transition-all duration-500"
          style={{
            boxShadow: "var(--shadow-inset-light)",
          }}
        />

        {/* Eyes track - subtle metallic finish */}
        <rect
          x="12"
          y="16"
          width="16"
          height="4"
          rx="2"
          fill="var(--bg-darker)"
          opacity="0.6"
        />

        {/* Scan line - using theme's accent color */}
        <rect
          x="12"
          y="16"
          width="16"
          height="4"
          rx="2"
          fill={color}
          opacity="0"
        >
          <animate
            attributeName="width"
            values="0;16;0"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.85;0"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill"
            values={`${color};${color}cc;${color}`}
            dur="2.8s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Mouth - subtle curve like brushed metal reflection */}
        <path
          d="M16 26 Q20 30 24 26"
          stroke="var(--text-muted)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-[var(--text-primary)]"
        />

        {/* Antenna - metallic finish */}
        <circle
          cx="20"
          cy="4"
          r="2.5"
          fill="url(#metalGradient)"
          stroke="var(--border-light)"
          strokeWidth="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        <line
          x1="20"
          y1="6.5"
          x2="20"
          y2="10"
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-[var(--text-secondary)]"
        />
      </g>

      {/* Speech bubble - glass surface effect */}
      <g transform="translate(38, 6)">
        <path
          d="M16 6H4C1.8 6 0 7.8 0 10V16C0 18.2 1.8 20 4 20H12L16 24V20H20C22.2 20 24 18.2 24 16V10C24 7.8 22.2 6 20 6H16Z"
          fill="url(#bubbleGradient)"
          stroke="var(--border-light)"
          strokeWidth="1"
          className="backdrop-blur-sm"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -3; 0 0"
            dur="3.5s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
            calcMode="spline"
          />
        </path>

        <text
          x="12"
          y="14"
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize="6"
          fontWeight="500"
          fontFamily="'Inter', 'Segoe UI', sans-serif"
          letterSpacing="0.5"
          className="opacity-90"
        >
          Hi
        </text>
      </g>

      <defs>
        {/* Theme-based gradients */}
        <linearGradient id="headGradient" x1="0" y1="0" x2="0" y2="32">
          <stop offset="0%" stopColor="var(--bg-metal)" />
          <stop offset="100%" stopColor="var(--bg-darker)" />
        </linearGradient>

        <linearGradient id="bubbleGradient" x1="0" y1="0" x2="0" y2="24">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
        </linearGradient>

        <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--text-primary)" />
          <stop offset="100%" stopColor="var(--text-muted)" />
        </linearGradient>

        {/* Glow filter for accent */}
        <filter id="accentGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  </div>
);
