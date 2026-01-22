import BundleComponentCard from './BundleComponentCard'

export interface BundleComponent {
  id: string
  title: string
  resolutionSource: string
  weight: number
  progressColor?: 'long' | 'short' | 'neutral'
}

interface BundleCompositionProps {
  components: BundleComponent[]
  polymarketUrl?: string
}

export default function BundleComposition({
  components,
  polymarketUrl,
}: BundleCompositionProps) {
  return (
    <div className="mt-8">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-text-primary text-2xl font-bold">
          Bundle Composition
        </h2>
        {polymarketUrl && (
          <a
            href={polymarketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-long hover:text-long-hover text-sm font-semibold transition-colors"
          >
            View on Polymarket
          </a>
        )}
      </div>

      {/* 组成项列表 */}
      <div className="space-y-4">
        {components.map((component) => (
          <BundleComponentCard
            key={component.id}
            title={component.title}
            resolutionSource={component.resolutionSource}
            weight={component.weight}
            progressColor={component.progressColor}
          />
        ))}
      </div>
    </div>
  )
}
