import ProductCard from './ProductCard'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'

export default function ProductGrid({ data, isLoading, isError, error, page }) {
  if (isLoading) return <LoadingSpinner text="Memuat produk..." />
  if (isError) return <ErrorMessage message={error?.message || 'Gagal memuat produk'} />

  const products = data?.data || []
  const pagination = data?.meta?.pagination

  return (
    <div>
      <div className="mb-8">
        <SearchInput placeholder="Cari produk..." />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <p>Tidak ada produk ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {pagination && (
        <Pagination
          currentPage={page}
          totalPages={pagination.pageCount}
        />
      )}
    </div>
  )
}
