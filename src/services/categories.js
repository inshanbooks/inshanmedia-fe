import api from './api'

export async function getCategories() {
  return api.get('/categories', {
    params: {
      sort: 'name:asc',
    },
  })
}

export async function getCategoryBySlug(slug) {
  const response = await api.get('/categories', {
    params: {
      'filters[slug][$eq]': slug,
    },
  })

  const category = response.data?.[0]
  if (!category) throw new Error('Kategori tidak ditemukan')
  return category
}
