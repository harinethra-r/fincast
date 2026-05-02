/** 70×70 rotating sun — spec: 30s spin, pulsing core */
export function SunGraphic() {
  return (
    <div className="relative h-[70px] w-[70px]">
      <div
        className="sun-pulse-inner absolute inset-[18px] rounded-full bg-[rgba(255,209,102,0.25)]"
        aria-hidden
      />
      <svg
        className="sun-spin relative block h-[70px] w-[70px]"
        viewBox="0 0 70 70"
        fill="none"
        aria-hidden
      >
        <circle
          cx="35"
          cy="35"
          r="12"
          fill="rgba(255,209,102,0.2)"
          stroke="rgba(255,209,102,0.5)"
          strokeWidth="1"
        />
        <circle cx="35" cy="35" r="7" fill="rgba(255,209,102,0.4)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="35"
            y1="5"
            x2="35"
            y2="16"
            stroke="rgba(255,209,102,0.4)"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${angle} 35 35)`}
          />
        ))}
      </svg>
    </div>
  );
}
