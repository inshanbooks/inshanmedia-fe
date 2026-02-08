import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getArticles } from '@/services/articles'

export function useArticles() {
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const search = searchParams.get('q') || ''
  const kategori = searchParams.get('kategori') || ''

  const query = useQuery({
    queryKey: ['articles', { page, search, kategori }],
    queryFn: () => getArticles({ page, search, kategori }),
  })

  return {
    ...query,
    page,
    search,
    kategori,
  }
}
