interface FdxLogoProps {
  size?: number;
}

export const FdxLogo = ({ size = 200 }: FdxLogoProps) => {
  return (
    <div
      className="relative flex items-center justify-center animate-fdx-float"
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle, hsl(var(--fdx-gold) / 0.5), transparent 65%)" }}
      />

      <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-[0_0_30px_hsl(var(--fdx-gold)/0.6)]">
        <defs>
          <linearGradient id="fdxGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--fdx-gold-light))" />
            <stop offset="50%" stopColor="hsl(var(--fdx-gold))" />
            <stop offset="100%" stopColor="hsl(var(--fdx-gold-dark))" />
          </linearGradient>
          <linearGradient id="fdxGoldStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--fdx-gold-light))" />
            <stop offset="100%" stopColor="hsl(var(--fdx-gold-dark))" />
          </linearGradient>
        </defs>

        {/* Hex frame */}
        <polygon
          points="100,8 178,54 178,146 100,192 22,146 22,54"
          fill="hsl(var(--fdx-black))"
          stroke="url(#fdxGoldStroke)"
          strokeWidth="2"
        />
        <polygon
          points="100,20 168,60 168,140 100,180 32,140 32,60"
          fill="none"
          stroke="hsl(var(--fdx-gold) / 0.4)"
          strokeWidth="1"
        />

        {/* Tech lines */}
        <line x1="32" y1="100" x2="60" y2="100" stroke="hsl(var(--fdx-gold) / 0.6)" strokeWidth="1" />
        <line x1="140" y1="100" x2="168" y2="100" stroke="hsl(var(--fdx-gold) / 0.6)" strokeWidth="1" />
        <circle cx="60" cy="100" r="2" fill="hsl(var(--fdx-gold))" />
        <circle cx="140" cy="100" r="2" fill="hsl(var(--fdx-gold))" />

        {/* FDX text */}
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fontSize="48"
          fontWeight="900"
          fontFamily="ui-sans-serif, system-ui"
          fill="url(#fdxGold)"
          letterSpacing="2"
        >
          FDX
        </text>
      </svg>
    </div>
  );
};
