import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getArticles } from '@/services/articles'
import { getProducts } from '@/services/products'
import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'
import ArticleCard from '@/components/berita/ArticleCard'
import ProductCard from '@/components/produk/ProductCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import siteConfig from '@/config/site'

export default function HomePage() {
  const { data: articlesData, isLoading: articlesLoading } = useQuery({
    queryKey: ['articles', { page: 1, pageSize: 6 }],
    queryFn: () => getArticles({ page: 1, pageSize: 6 }),
  })

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', { page: 1, pageSize: 4 }],
    queryFn: () => getProducts({ page: 1, pageSize: 4 }),
  })

  const articles = articlesData?.data || []
  const products = productsData?.data || []

  return (
    <>
      <PageMeta />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-700 dark:from-navy dark:to-primary-900 text-white py-20 md:py-32">
        <SectionContainer className="text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Selamat Datang di{' '}
            <span className="text-accent">Inshan Media</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/berita" className="btn bg-accent text-gray-900 hover:bg-accent-400 font-semibold px-6 py-3">
              Baca Berita
            </Link>
            <Link to="/produk" className="btn bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3">
              Lihat Produk
            </Link>
          </div>
        </SectionContainer>
      </section>

      {/* Latest Articles */}
      <section className="py-16">
        <SectionContainer>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Berita Terbaru</h2>
            <Link to="/berita" className="text-primary dark:text-primary-300 hover:underline text-sm font-medium">
              Lihat Semua →
            </Link>
          </div>
          {articlesLoading ? (
            <LoadingSpinner />
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">Belum ada artikel.</p>
          )}
        </SectionContainer>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <SectionContainer>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Produk Kami</h2>
            <Link to="/produk" className="text-primary dark:text-primary-300 hover:underline text-sm font-medium">
              Lihat Semua →
            </Link>
          </div>
          {productsLoading ? (
            <LoadingSpinner />
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">Belum ada produk.</p>
          )}
        </SectionContainer>
      </section>
    </>
  )
}
