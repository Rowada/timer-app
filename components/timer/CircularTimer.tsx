type CircularTimerProps = {
  width: number;
  timeLeft: number;
  duration: number;
  className?: string;
  radiusRatio: number;
};

export const CircularTimer: React.FC<CircularTimerProps> = ({
  width,
  timeLeft,
  duration,
  className,
  radiusRatio,
}) => {
  const radius = (width / 2) * radiusRatio;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (circumference * timeLeft) / duration;

  return (
    <svg
      width={width}
      height={width}
      style={{ transform: "rotate(-90deg)" }}
      className={className}
    >
      <circle
        className="text-accent"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx={width / 2}
        cy={width / 2}
      />
      <circle
        className="text-primary"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx={width / 2}
        cy={width / 2}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};
