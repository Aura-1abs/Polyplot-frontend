interface AvailableBalanceCardProps {
  balance: number
}

export default function AvailableBalanceCard({ balance }: AvailableBalanceCardProps) {
  return (
    <div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
      {/* 装饰性背景图标 */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
        <div className="text-9xl font-bold text-text-primary">$</div>
      </div>

      {/* 内容 */}
      <div className="relative z-10">
        <p className="text-text-secondary text-sm mb-2">Available USDC</p>
        <h2 className="text-currency text-4xl font-bold mb-2">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
        <div className="flex items-center gap-2 text-text-tertiary text-sm">
          <div className="w-2 h-2 rounded-full bg-text-tertiary"></div>
          <span>Ready to trade</span>
        </div>
      </div>
    </div>
  )
}
