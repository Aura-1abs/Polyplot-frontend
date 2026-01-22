'use client'

interface AmountInputProps {
  balance: number
  value: number
  onChange: (value: number) => void
}

export default function AmountInput({
  balance,
  value,
  onChange,
}: AmountInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0
    onChange(newValue)
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-secondary text-sm font-medium">Amount</span>
        <span className="text-text-tertiary text-sm">
          Balance: ${balance.toFixed(2)}
        </span>
      </div>

      <div className="bg-bg-secondary border border-border-primary rounded-xl px-4 py-4 flex items-center">
        <span className="text-text-tertiary text-xl mr-3">$</span>
        <input
          type="number"
          value={value || ''}
          onChange={handleInputChange}
          placeholder="0.00"
          step="0.01"
          min="0"
          max={balance}
          className="bg-transparent text-text-primary text-xl font-medium flex-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-text-tertiary text-sm ml-3">USDC</span>
      </div>
    </div>
  )
}
