import ArticleCard from './ArticleCard'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'

export default function ArticleList({ data, isLoading, isError, error, page }) {
  if (isLoading) return <LoadingSpinner text="Memuat artikel..." />
  if (isError) return <ErrorMessage message={error?.message || 'Gagal memuat artikel'} />

  const articles = data?.data || []
  const pagination = data?.meta?.pagination

  return (
    <div>
      <div className="mb-8">
        <SearchInput placeholder="Cari artikel..." />
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <p>Tidak ada artikel ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
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
