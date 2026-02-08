import api from './api'

export async function getProducts({ page = 1, pageSize = 9, search = '' } = {}) {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    populate: 'cover,images,kategori',
    sort: 'publishedAt:desc',
  }

  if (search) {
    params['filters[title][$containsi]'] = search
  }

  return api.get('/products', { params })
}

export async function getProductBySlug(slug) {
  const response = await api.get('/products', {
    params: {
      'filters[slug][$eq]': slug,
      populate: 'cover,images,kategori',
    },
  })

  const product = response.data?.[0]
  if (!product) throw new Error('Produk tidak ditemukan')
  return product
}
