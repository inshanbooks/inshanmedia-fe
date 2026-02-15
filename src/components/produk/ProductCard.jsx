import { Link } from 'react-router-dom'
import { getImageUrl } from '@/utils/strapiHelpers'
import PriceDisplay from './PriceDisplay'

export default function ProductCard({ product }) {
  if (!product) return null

  const { name, slug, images, price, sale_price } = product
  const imageUrl = getImageUrl(images?.[0])

  return (
    <article className="card group hover:shadow-lg transition-shadow duration-200">
      <Link to={`/produk/${slug}`}>
        <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <h2 className="font-heading font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary-300 transition-colors">
          <Link to={`/produk/${slug}`}>{name}</Link>
        </h2>
        <PriceDisplay price={price} salePrice={sale_price} />
        <Link
          to={`/produk/${slug}`}
          className="mt-3 block text-center btn-primary text-sm py-1.5"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  )
}
