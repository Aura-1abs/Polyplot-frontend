interface TradeInfoProps {
  estimatedShares: number
  avgPrice: number
  maxProfit: number
}

export default function TradeInfo({
  estimatedShares,
  avgPrice,
  maxProfit,
}: TradeInfoProps) {
  return (
    <div className="bg-bg-secondary rounded-xl p-5 mb-6 space-y-4 border border-border-primary">
      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-sm">Est. Shares</span>
        <span className="text-text-primary font-semibold">
          {estimatedShares.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-sm">Avg. Price</span>
        <span className="text-text-primary font-semibold">
          {avgPrice.toFixed(2)} USDC
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text-tertiary text-sm">Max Profit</span>
        <span className="text-text-primary font-semibold">
          ${maxProfit.toFixed(2)}
        </span>
      </div>
    </div>
  )
}
