/** Pulsing rings for storm-warning contexts */
export function StormGraphic() {
  return (
    <div className="relative flex h-[120px] w-[120px] items-center justify-center">
      {[0, 0.6, 1.2].map((delay) => (
        <span
          key={delay}
          className="absolute rounded-full border border-[var(--red)] opacity-80"
          style={{
            width: 72,
            height: 72,
            animation: `stormPulse 2.4s ease-out infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes stormPulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
