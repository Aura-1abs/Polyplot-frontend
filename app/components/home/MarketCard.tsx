import { ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import StatusBadge from './StatusBadge';

export interface MarketCardProps {
  id: string;
  category: string;
  statusBadge?: {
    type: 'new' | 'hot' | 'left';
    text: string;
  };
  imageUrl: string;
  title: string;
  description: string;
  longPercentage: number;
  shortPercentage: number;
  volume: string;
  participants: number;
  participantImages?: string[];
  onBuyLong?: () => void;
  onBuyShort?: () => void;
}

export default function MarketCard({
  category,
  statusBadge,
  imageUrl,
  title,
  description,
  longPercentage,
  shortPercentage,
  volume,
  participants,
  participantImages = [],
  onBuyLong,
  onBuyShort,
}: MarketCardProps) {
  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-border-primary shadow-xl hover:shadow-2xl transition-shadow">
      {/* 卡片头部背景图 */}
      <div className="relative h-48 bg-gradient-to-br from-bg-secondary to-bg-primary overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover opacity-60"
        />

        {/* 标签组 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <CategoryBadge category={category} />
          {statusBadge && (
            <StatusBadge type={statusBadge.type} text={statusBadge.text} />
          )}
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="p-6">
        <h3 className="text-text-primary font-bold text-xl mb-2">
          {title}
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          {description}
        </p>

        {/* 进度条 */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-long font-semibold">{longPercentage}% LONG</span>
            <span className="text-short font-semibold">{shortPercentage}% SHORT</span>
          </div>
          <div className="h-2 bg-bg-secondary rounded-full overflow-hidden flex">
            <div
              className="bg-long transition-all duration-300"
              style={{ width: `${longPercentage}%` }}
            ></div>
            <div
              className="bg-short transition-all duration-300"
              style={{ width: `${shortPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex items-center justify-between mb-4 text-text-secondary text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp size={16} />
            <span>{volume} Vol</span>
          </div>

          <div className="flex items-center gap-2">
            {/* 用户头像群组 */}
            {participantImages.length > 0 && (
              <div className="flex -space-x-2">
                {participantImages.slice(0, 3).map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`User ${idx + 1}`}
                    width={24}
                    height={24}
                    className="rounded-full border-2 border-bg-card"
                  />
                ))}
              </div>
            )}
            {participants > participantImages.length && (
              <span className="text-text-secondary font-semibold">
                +{participants - participantImages.length}
              </span>
            )}
          </div>
        </div>

        {/* 按钮组 */}
        <div className="flex gap-3">
          <button
            onClick={onBuyLong}
            className="flex-1 bg-long hover:bg-long-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ThumbsUp size={18} />
            Buy Long
          </button>
          <button
            onClick={onBuyShort}
            className="flex-1 bg-short hover:bg-short-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ThumbsDown size={18} />
            Buy Short
          </button>
        </div>
      </div>
    </div>
  );
}
