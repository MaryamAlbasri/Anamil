
// AI Assistance: ChatGPT helped implement this reusable Tag component.

export default function Tag({
  children,
  variant = "default",
  className = "",
}) {
  return (
    <span
      className={`anamil-tag anamil-tag--${variant} ${className}`}
    >
      {children}
    </span>
  );
}
