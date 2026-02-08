import api from './api'

export async function getArticles({ page = 1, pageSize = 5, search = '', kategori = '' } = {}) {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    populate: 'cover,kategori,author',
    sort: 'publishedAt:desc',
  }

  if (search) {
    params['filters[title][$containsi]'] = search
  }

  if (kategori) {
    params['filters[kategori][slug][$eq]'] = kategori
  }

  return api.get('/articles', { params })
}

export async function getArticleBySlug(slug) {
  const response = await api.get('/articles', {
    params: {
      'filters[slug][$eq]': slug,
      populate: 'cover,kategori,author',
    },
  })

  const article = response.data?.[0]
  if (!article) throw new Error('Artikel tidak ditemukan')
  return article
}
