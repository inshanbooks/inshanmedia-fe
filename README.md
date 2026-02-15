# Inshan Media — Frontend

Frontend SPA untuk [inshanmedia.com](https://inshanmedia.com) — platform berita dan produk CV Inshan Karya Permata. Dibangun dengan Vite + React, mengonsumsi konten dari Strapi CMS.

## Stack

- **Vite 5** + **React 18**
- **React Router DOM v6** — client-side routing
- **TanStack Query v5** — data fetching & caching
- **Axios** — HTTP client dengan interceptor Strapi
- **Tailwind CSS v3** + `@tailwindcss/typography`
- **react-helmet-async** — SEO per halaman

## Prasyarat

- Node.js >= 18 atau [Bun](https://bun.sh)
- Strapi v5 berjalan di `http://localhost:1337`

## Setup

```bash
# Clone & install
bun install

# Salin env template dan isi nilainya
cp .env.example .env
```

Isi `.env`:

```env
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_token_here   # opsional, untuk konten private
```

## Perintah

```bash
bun run dev       # Dev server di http://localhost:3000
bun run build     # Production build → dist/
bun run preview   # Preview hasil build
bun run lint      # ESLint (zero warnings)
```

## Struktur Proyek

```
src/
├── components/
│   ├── berita/       # ArticleCard, BlockRenderer (Strapi blocks)
│   ├── produk/       # ProductCard
│   ├── layout/       # Header, Footer, Layout
│   └── seo/          # PageMeta (react-helmet-async)
├── hooks/            # useArticles, useProducts, useCategories, dll
├── pages/            # HomePage, BeritaPage, BeritaDetailPage, ProdukPage, dst
├── services/         # api.js (Axios instance), articles.js, products.js, dll
├── utils/
│   └── strapiHelpers.js  # getImageUrl, extractTextFromBlocks
├── config/
│   └── site.js       # Metadata global (title, siteUrl, dsb)
├── context/
│   └── ThemeContext.jsx  # Dark mode toggle
├── App.jsx           # Route definitions
└── main.jsx          # Provider stack
```

## Routing

| Path | Halaman |
|------|---------|
| `/` | HomePage |
| `/berita` | BeritaPage (list + search + filter kategori) |
| `/berita/:slug` | BeritaDetailPage |
| `/produk` | ProdukPage |
| `/produk/:slug` | ProdukDetailPage |
| `/tentangkami` | TentangKamiPage |

## Integrasi Strapi

- **Images**: `getImageUrl(imageData)` di `src/utils/strapiHelpers.js`
- **Rich text**: `<BlockRenderer blocks={...} />` untuk field `konten` (Strapi Blocks JSON)
- **Pagination**: param `?pagination[page]=N&pagination[pageSize]=N`
- **Filter**: `?filters[field][$containsi]=value`

Pastikan permission **Public** di Strapi aktif untuk: `find` + `findOne` pada collection `articles`, `products`, `categories`, `authors`.

## Theme

Dark mode berbasis class (`html.dark`). Toggle via `useTheme()` hook, preferensi disimpan di `localStorage`.

## Deployment

Build menghasilkan static files di `dist/`. CI/CD via GitHub Actions (`.github/workflows/deploy.yml`) — upload `dist/` ke server via rsync.

### GitHub Secrets yang dibutuhkan

| Secret | Keterangan |
|--------|------------|
| `SSH_PRIVATE_KEY` | Private key SSH ke server |
| `SSH_HOST` | Hostname / IP server |
| `SSH_USER` | Username SSH |
| `DEPLOY_PATH` | Path tujuan di server, contoh: `/home/inshanme/inshanmedia.com/public_html` |
| `VITE_STRAPI_API_URL` | URL Strapi production |
| `VITE_STRAPI_API_TOKEN` | API token Strapi production |

Setiap push ke branch `main` akan otomatis memicu deploy.
