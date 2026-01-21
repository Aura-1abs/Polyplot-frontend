'use client';

import { Plus } from 'lucide-react';

interface BalanceDisplayProps {
  balance?: number;
}

export default function BalanceDisplay({ balance = 1240.50 }: BalanceDisplayProps) {
  const handleDeposit = () => {
    // TODO: Open deposit modal
    console.log('Open deposit modal');
  };

  return (
    <div className="flex items-center gap-2 bg-bg-secondary rounded-full pl-4 pr-1 py-1 border border-border-primary">
      {/* Balance Amount */}
      <span className="text-currency font-bold text-lg">
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>

      {/* Deposit Button */}
      <button
        onClick={handleDeposit}
        className="w-8 h-8 rounded-full bg-long hover:bg-long-hover text-white flex items-center justify-center transition-colors"
        aria-label="Deposit funds"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
