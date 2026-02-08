import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '@/services/products'

export function useProducts() {
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1', 10)
  const search = searchParams.get('q') || ''

  const query = useQuery({
    queryKey: ['products', { page, search }],
    queryFn: () => getProducts({ page, search }),
  })

  return {
    ...query,
    page,
    search,
  }
}
