import { Link } from 'react-router-dom'
import { formatDateShort } from '@/utils/formatDate'
import { getImageUrl, extractTextFromBlocks } from '@/utils/strapiHelpers'
import Tag from '@/components/ui/Tag'

export default function ArticleCard({ article }) {
  if (!article) return null

  const { title, slug, publishedAt, cover, kategori, content } = article

  const imageUrl = getImageUrl(cover)
  const excerpt = extractTextFromBlocks(content)
  const categoryName = kategori?.name
  const categorySlug = kategori?.slug

  return (
    <article className="card group hover:shadow-lg transition-shadow duration-200">
      {imageUrl && (
        <Link to={`/berita/${slug}`}>
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="p-5">
        {categoryName && (
          <div className="mb-2">
            <Tag text={categoryName} slug={categorySlug} />
          </div>
        )}
        <h2 className="font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary-300 transition-colors">
          <Link to={`/berita/${slug}`}>{title}</Link>
        </h2>
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">{excerpt}</p>
        )}
        <div className="flex items-center justify-between">
          <time className="text-xs text-gray-500 dark:text-gray-500">
            {formatDateShort(publishedAt)}
          </time>
          <Link
            to={`/berita/${slug}`}
            className="text-sm text-primary dark:text-primary-300 font-medium hover:underline"
          >
            Baca →
          </Link>
        </div>
      </div>
    </article>
  )
}
