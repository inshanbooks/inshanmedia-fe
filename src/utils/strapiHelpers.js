const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337'

export function getImageUrl(imageData) {
  if (!imageData) return null

  // Strapi v5: imageData can be { url: '...' } directly or nested
  const url = imageData?.url || imageData?.data?.attributes?.url
  if (!url) return null

  // If already absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) return url

  return `${STRAPI_URL}${url}`
}

export function extractTextFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return ''

  return blocks
    .filter((block) => block.type === 'paragraph')
    .map((block) =>
      block.children
        ?.filter((child) => child.type === 'text')
        .map((child) => child.text)
        .join('')
    )
    .join(' ')
    .slice(0, 200)
}

export function getStrapiMediaFormats(imageData) {
  if (!imageData) return {}
  return imageData?.formats || imageData?.data?.attributes?.formats || {}
}
