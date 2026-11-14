// AI Assistance: ChatGPT helped implement this reusable Tag component.
// Status colors added with Claude (Opus 5.5) to match the Anamil theme.

const styles = {
  // statuses
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-green-100 text-green-800',
  accepted: 'bg-green-100 text-green-800',
  approved: 'bg-green-100 text-green-800',
  verified: 'bg-green-100 text-green-800',
  active: 'bg-green-100 text-green-800',
  delivered: 'bg-green-100 text-green-800',
  completed: 'bg-ink/10 text-ink',
  shipped: 'bg-blue-100 text-blue-800',
  processing: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-700',
  canceled: 'bg-red-100 text-red-700',
  declined: 'bg-red-100 text-red-700',
  rejected: 'bg-red-100 text-red-700',
  failed: 'bg-red-100 text-red-700',
  // general variants
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-800',
  default: 'bg-blush text-ink',
}

export default function Tag({ children, variant = 'default', className = '' }) {
  const fromVariant = String(variant).trim().toLowerCase()
  const fromText = String(children ?? '').trim().toLowerCase()

  const style =
    (fromVariant !== 'default' && styles[fromVariant]) ||
    styles[fromText] ||
    styles.default

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${style} ${className}`}
    >
      {children}
    </span>
  )
}