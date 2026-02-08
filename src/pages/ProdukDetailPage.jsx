import { useParams, Link } from 'react-router-dom'
import { useProduct } from '@/hooks/useProduct'
import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'
import BlockRenderer from '@/components/berita/BlockRenderer'
import ProductGallery from '@/components/produk/ProductGallery'
import PriceDisplay from '@/components/produk/PriceDisplay'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { extractTextFromBlocks } from '@/utils/strapiHelpers'

export default function ProdukDetailPage() {
  const { slug } = useParams()
  const { data: product, isLoading, isError, error } = useProduct(slug)

  if (isLoading) {
    return (
      <SectionContainer className="py-12">
        <LoadingSpinner text="Memuat produk..." />
      </SectionContainer>
    )
  }

  if (isError) {
    return (
      <SectionContainer className="py-12">
        <ErrorMessage message={error?.message || 'Produk tidak ditemukan'} />
        <div className="text-center mt-4">
          <Link to="/produk" className="btn-primary">
            Kembali ke Produk
          </Link>
        </div>
      </SectionContainer>
    )
  }

  if (!product) return null

  const { name, price, sale_price, images, description } = product
  const excerpt = extractTextFromBlocks(description)

  return (
    <>
      <PageMeta
        title={name}
        description={excerpt}
      />
      <SectionContainer className="py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary">Beranda</Link>
          <span className="mx-2">/</span>
          <Link to="/produk" className="hover:text-primary">Produk</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery images={images || []} />
          </div>

          {/* Info */}
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4">{name}</h1>
            <PriceDisplay price={price} salePrice={sale_price} className="mb-6" />

            {excerpt && (
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{excerpt}</p>
            )}

            <a
              href={`https://wa.me/?text=Saya tertarik dengan produk: ${name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto px-8 py-3 text-base"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>

        {/* Full Description */}
        {description && (
          <div className="mt-16">
            <h2 className="font-heading text-xl font-semibold mb-4">Deskripsi</h2>
            <BlockRenderer blocks={description} />
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link to="/produk" className="btn-outline">
            ← Kembali ke Produk
          </Link>
        </div>
      </SectionContainer>
    </>
  )
}
