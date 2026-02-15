import { useParams, Link } from 'react-router-dom'
import { useArticle } from '@/hooks/useArticle'
import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'
import BlockRenderer from '@/components/berita/BlockRenderer'
import Tag from '@/components/ui/Tag'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { formatDate } from '@/utils/formatDate'
import { getImageUrl, extractTextFromBlocks } from '@/utils/strapiHelpers'

export default function BeritaDetailPage() {
  const { slug } = useParams()
  const { data: article, isLoading, isError, error } = useArticle(slug)

  if (isLoading) {
    return (
      <SectionContainer className="py-12">
        <LoadingSpinner text="Memuat artikel..." />
      </SectionContainer>
    )
  }

  if (isError) {
    return (
      <SectionContainer className="py-12">
        <ErrorMessage message={error?.message || 'Artikel tidak ditemukan'} />
        <div className="text-center mt-4">
          <Link to="/berita" className="btn-primary">
            Kembali ke Berita
          </Link>
        </div>
      </SectionContainer>
    )
  }

  if (!article) return null

  const { title, publishedAt, featured_image, categories, content, author } = article
  const imageUrl = getImageUrl(featured_image)
  const excerpt = extractTextFromBlocks(content)

  return (
    <>
      <PageMeta
        title={title}
        description={excerpt}
        image={imageUrl}
        type="article"
      />
      <SectionContainer className="py-12">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-primary">Beranda</Link>
            <span className="mx-2">/</span>
            <Link to="/berita" className="hover:text-primary">Berita</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{title}</span>
          </nav>

          {/* Categories */}
          {categories?.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Tag key={cat.id} text={cat.name} slug={cat.slug} />
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">{title}</h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            {author?.name && <span>Oleh {author.name}</span>}
            <time>{formatDate(publishedAt)}</time>
          </div>

          {/* Cover Image */}
          {imageUrl && (
            <div className="rounded-xl overflow-hidden mb-8">
              <img src={imageUrl} alt={title} className="w-full" />
            </div>
          )}

          {/* Content */}
          <BlockRenderer blocks={content} />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link to="/berita" className="btn-outline">
              ← Kembali ke Berita
            </Link>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
