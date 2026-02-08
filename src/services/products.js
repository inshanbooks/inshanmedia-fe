import api from './api'

export async function getProducts({ page = 1, pageSize = 9, search = '' } = {}) {
  const params = {
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
    populate: '*',
    sort: 'createdAt:desc',
  }

  if (search) {
    params['filters[name][$containsi]'] = search
  }

  return api.get('/products', { params })
}

export async function getProductBySlug(slug) {
  const response = await api.get('/products', {
    params: {
      'filters[slug][$eq]': slug,
      populate: '*',
    },
  })

  const product = response.data?.[0]
  if (!product) throw new Error('Produk tidak ditemukan')
  return product
}
