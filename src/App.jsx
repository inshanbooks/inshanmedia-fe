import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
import BeritaPage from '@/pages/BeritaPage'
import BeritaDetailPage from '@/pages/BeritaDetailPage'
import ProdukPage from '@/pages/ProdukPage'
import ProdukDetailPage from '@/pages/ProdukDetailPage'
import TentangKamiPage from '@/pages/TentangKamiPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="berita" element={<BeritaPage />} />
          <Route path="berita/:slug" element={<BeritaDetailPage />} />
          <Route path="produk" element={<ProdukPage />} />
          <Route path="produk/:slug" element={<ProdukDetailPage />} />
          <Route path="tentangkami" element={<TentangKamiPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
