import { useQuery } from '@tanstack/react-query'
import { getArticleBySlug } from '@/services/articles'

export function useArticle(slug) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug),
    enabled: !!slug,
  })
}
