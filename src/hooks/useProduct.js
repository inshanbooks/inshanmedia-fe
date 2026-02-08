import { useQuery } from '@tanstack/react-query'
import { getProductBySlug } from '@/services/products'

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  })
}
