import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'
import ArticleList from '@/components/berita/ArticleList'
import { useArticles } from '@/hooks/useArticles'

export default function BeritaPage() {
  const { data, isLoading, isError, error, page, kategori } = useArticles()

  const title = kategori
    ? `Berita - Kategori: ${kategori}`
    : 'Berita'

  return (
    <>
      <PageMeta title={title} description="Kumpulan berita dan artikel terbaru dari Inshan Media" />
      <SectionContainer className="py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Kumpulan berita dan artikel terbaru dari Inshan Media
        </p>
        <ArticleList
          data={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          page={page}
        />
      </SectionContainer>
    </>
  )
}
