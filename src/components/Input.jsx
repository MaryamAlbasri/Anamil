
// AI Assistance: ChatGPT helped implement this reusable Input component.

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  className = "",
}) {
  return (
    <div className={`anamil-input-group ${className}`}>
      {label && (
        <label htmlFor={name} className="anamil-input-label">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error && name ? `${name}-error` : undefined}
        className={`anamil-input ${error ? "anamil-input-error" : ""}`}
      />

      {error && (
        <p id={name ? `${name}-error` : undefined} className="anamil-error-message">
          {error}
        </p>
      )}
    </div>
  );
}
