interface BundleComponentCardProps {
  title: string
  resolutionSource: string
  weight: number
  progressColor?: 'long' | 'short' | 'neutral'
}

export default function BundleComponentCard({
  title,
  resolutionSource,
  weight,
  progressColor = 'neutral',
}: BundleComponentCardProps) {
  const getProgressColorClass = () => {
    switch (progressColor) {
      case 'long':
        return 'bg-long'
      case 'short':
        return 'bg-short'
      case 'neutral':
        return 'bg-text-tertiary'
      default:
        return 'bg-text-tertiary'
    }
  }

  return (
    <div className="bg-bg-secondary rounded-xl p-6 border border-border-primary hover:border-border-secondary transition-colors">
      {/* 标题和权重 */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-text-primary font-semibold text-lg flex-1 pr-4">
          {title}
        </h3>
        <div className="flex flex-col items-end">
          <span className="text-text-primary text-3xl font-bold">
            {weight}%
          </span>
          <span className="text-text-tertiary text-xs uppercase tracking-wider mt-1">
            WEIGHT
          </span>
        </div>
      </div>

      {/* Resolution Source */}
      <p className="text-text-tertiary text-sm mb-4">
        Resolution Source: {resolutionSource}
      </p>

      {/* 进度条 */}
      <div className="w-full bg-bg-primary rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getProgressColorClass()} transition-all duration-500`}
          style={{ width: `${weight}%` }}
        />
      </div>
    </div>
  )
}
