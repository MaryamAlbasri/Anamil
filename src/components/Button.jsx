
// AI Assistance: ChatGPT helped implement this reusable Button component.

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`anamil-btn anamil-btn--${variant} ${className}`}
    >
      {children}
    </button>
  );
}