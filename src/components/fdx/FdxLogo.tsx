import logo from "/fdx-logo.png";

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
      <img
        src={logo}
        alt="FDX Coin logo"
        className="relative w-full h-full object-contain drop-shadow-[0_0_30px_hsl(var(--fdx-gold)/0.6)]"
        style={{ width: size, height: size }}
      />
    </div>
  );
};
