export default function ProgressBar({ value = 0, className = '', color = null }) {
  return (
    <div className={`progress-bar-container ${className}`}>
      <div
        className="progress-bar-fill"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          ...(color ? { background: `linear-gradient(90deg, ${color}, ${color}aa)` } : {}),
        }}
      />
    </div>
  );
}
