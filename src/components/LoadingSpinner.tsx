interface Props {
  label?: string;
}

export const LoadingSpinner = ({ label = "Loading market data..." }: Props) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[600px]">
    <div className="relative">
      <div className="w-14 h-14 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 w-14 h-14 rounded-full border-2 border-transparent border-t-primary animate-spin-slow" />
      <div className="absolute inset-2 rounded-full bg-primary/30 blur-xl animate-pulse-glow" />
    </div>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);
