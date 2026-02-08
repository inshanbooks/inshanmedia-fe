import { useState } from 'react'
import { getImageUrl } from '@/utils/strapiHelpers'

export default function ProductGallery({ images = [] }) {
  const allImages = images
    .map((img) => ({ url: getImageUrl(img), alt: img.alternativeText || '' }))
    .filter((img) => img.url)

  const [activeIndex, setActiveIndex] = useState(0)

  if (allImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={allImages[activeIndex]?.url}
          alt={allImages[activeIndex]?.alt}
          className="w-full h-full object-contain"
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === activeIndex
                  ? 'border-primary'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
