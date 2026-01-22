interface PriceDisplayProps {
  label: string
  price: string
  change?: string
  changeDirection?: 'up' | 'down'
}

export default function PriceDisplay({
  label,
  price,
  change,
  changeDirection = 'up',
}: PriceDisplayProps) {
  return (
    <div className="mb-6">
      <span className="text-text-tertiary text-sm block mb-2">{label}</span>
      <div className="flex items-baseline gap-4">
        <span className="text-text-primary text-5xl font-bold">{price}</span>
        {change && (
          <span
            className={`text-sm font-semibold ${
              changeDirection === 'up' ? 'text-new' : 'text-left'
            }`}
          >
            {change} Today
          </span>
        )}
      </div>
    </div>
  )
}
