import api from './api'

export async function getAuthors() {
  return api.get('/authors', {
    params: {
      populate: 'avatar',
    },
  })
}

export async function getAuthorBySlug(slug) {
  const response = await api.get('/authors', {
    params: {
      'filters[slug][$eq]': slug,
      populate: 'avatar',
    },
  })

  const author = response.data?.[0]
  if (!author) throw new Error('Penulis tidak ditemukan')
  return author
}
