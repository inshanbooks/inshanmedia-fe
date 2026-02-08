import { formatPrice, calculateDiscount } from '@/utils/formatPrice'

export default function PriceDisplay({ price, salePrice, className = '' }) {
  const hasDiscount = salePrice && salePrice < price
  const discount = hasDiscount ? calculateDiscount(price, salePrice) : 0

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {hasDiscount ? (
        <>
          <span className="text-lg font-bold text-primary dark:text-primary-300">
            {formatPrice(salePrice)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(price)}
          </span>
          <span className="text-xs font-medium bg-accent text-gray-900 px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        </>
      ) : (
        <span className="text-lg font-bold text-primary dark:text-primary-300">
          {formatPrice(price)}
        </span>
      )}
    </div>
  )
}
