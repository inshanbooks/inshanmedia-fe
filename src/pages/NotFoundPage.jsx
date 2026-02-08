import { Link } from 'react-router-dom'
import PageMeta from '@/components/seo/PageMeta'
import SectionContainer from '@/components/layout/SectionContainer'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="404 - Halaman Tidak Ditemukan" noindex />
      <SectionContainer className="py-24 text-center">
        <h1 className="font-heading text-8xl font-bold text-primary/20 dark:text-primary/10 mb-4">404</h1>
        <h2 className="font-heading text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link to="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
      </SectionContainer>
    </>
  )
}
