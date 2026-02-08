import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'
import ProductGrid from '@/components/produk/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

export default function ProdukPage() {
  const { data, isLoading, isError, error, page } = useProducts()

  return (
    <>
      <PageMeta title="Produk" description="Temukan buku dan produk terbaru dari Inshan Books" />
      <SectionContainer className="py-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Produk</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Temukan buku dan produk terbaru dari Inshan Books
        </p>
        <ProductGrid
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
